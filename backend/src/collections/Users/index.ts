import { CollectionConfig, Field } from 'payload/types';
import { isLoggedIn } from '../Forms/field-access/isLoggedIn';
import { hasRole } from '../../access/hasRole';
import { registerCustomerEndpoint } from './endpoints/register';
import { updateCustomerEndpoint } from './endpoints/update';
import { or } from '../../access/or';
import { self } from './access/self';
import { isAdmin } from '../../access/isAdmin';

export type Role = 'admin' | 'product-editor' | 'customer' | 'business-customer';

const isCustomer = (_, sibling) => sibling.role === 'customer';
const isBusinessCustomer = (_, sibling) => sibling.role === 'business-customer';
const isCustomerOrBusinessCustomer = (_, sibling) => sibling.role === 'customer' || sibling.role === 'business-customer';

export const addressFields: Field[] = [
    {
        type: 'text',
        name: 'postalCode',
        label: 'Postal Code',
        required: true,
    },
    {
        type: 'text',
        name: 'houseNumber',
        label: 'House Number',
        required: true,
    },
    {
        type: 'text',
        name: 'houseNumberAddition',
        label: 'House Number Addition',
    },
    {
        type: 'text',
        name: 'street',
        label: 'Street',
        required: true,
    },
    {
        type: 'text',
        name: 'city',
        label: 'City',
        required: true,
    },
    {
        type: 'text',
        name: 'country',
        label: 'Country',
        required: true,
    },
]

const Users: CollectionConfig = {
    slug: 'users',
    labels: {
        singular: 'Gebruiker',
        plural: 'Gebruikers',
    },
    auth: {
        tokenExpiration: 60 * 60 * 24 * 3,
        verify: {
            generateEmailHTML: ({ token, user }) => {
                return `
                  <p>Beste ${user.firstName},</p>
                  <p>Welkom bij mijninterieurwinkel.nl. Klik op de onderstaande link om je account te activeren.</p>
                  <a href="${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/activeren/${token}">Activeer account</a>
                `
            },
            generateEmailSubject: ({ user }) => {
                return ` mijninterieurwinkel.nl - Verifieer je account`
            }
        },
        forgotPassword: {
            generateEmailHTML: ({ token, user, req }) => {
                return `
                    <p>Beste, ${user?.['firstName'] ?? ''}</p>
                    <p>Je hebt een verzoek ingediend om je wachtwoord opnieuw in te stellen. Klik op de onderstaande link om je wachtwoord opnieuw in te stellen.</p>
                    <a href="${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/wachtwoord-instellen?token=${token}">Wachtwoord opnieuw instellen</a>
                `
            },
            generateEmailSubject: () => {
                return ` mijninterieurwinkel.nl - Wachtwoord opnieuw instellen`
            }
        }
    },
    admin: {
        useAsTitle: 'email',
        group: 'Instellingen',
    },
    access: {
        read: or([
            self,
            isAdmin,
        ]),
        create: hasRole(['admin']),
        update: or([
            self,
            isAdmin,
        ]),
        delete: hasRole(['admin']),
        admin: hasRole(['admin', 'product-editor']),
    },
    endpoints: [
        registerCustomerEndpoint,
        updateCustomerEndpoint
    ],
    fields: [
        // Email added by default
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'role',
            label: 'Rol',
            type: 'select',
            options: [
                { label: 'Administrator', value: 'admin' },
                { label: 'Product editor', value: 'product-editor' },
                { label: 'Customer', value: 'customer' },
                { label: 'Business Customer', value: 'business-customer' },
            ],
            defaultValue: 'admin',
            required: true,
            saveToJWT: true,
            admin: {
                position: 'sidebar',
            }
        },
        {
            type: 'text',
            name: 'firstLetters',
            label: 'Voorletters',
            required: true,
            admin: {
                condition: isCustomerOrBusinessCustomer,
            }
        },
        {
            type: 'text',
            name: 'firstName',
            label: 'First Name',
            required: true,
            admin: {
                condition: isCustomerOrBusinessCustomer,
            }
        },
       
        {
            type: 'text',
            name: 'lastName',
            label: 'Last Name',
            required: true,
            admin: {
                condition: isCustomerOrBusinessCustomer,
            },
        },
        {
            type: 'text',
            name: 'fullName',
            label: 'Full Name',
            required: true,
            hooks: {
                beforeChange: [
                    ({ data, originalDoc }) => {
                        const firstName = data.firstName || originalDoc.firstName;
                        const lastName = data.lastName || originalDoc.lastName;
                        return `${firstName} ${lastName}`;
                    }
                ]
            },
            admin: {
                condition: isCustomerOrBusinessCustomer,
            }
        },
        {
            type: 'text',
            name: 'mobileNumber',
            label: 'Mobile Number',
            admin: {
                condition: isCustomerOrBusinessCustomer,
            }
        },
        {
            type: 'group',
            name: 'shippingAddress',
            label: 'Shipping Address',
            fields: addressFields,
            admin: {
                condition: isCustomerOrBusinessCustomer,
            }
        },
    ],
};

export default Users;
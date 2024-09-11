import { Endpoint } from "payload/config";
import { updateCustomerSchema } from "./schema";
import { ValidationError } from "../../../../lib/error-handling/errors/ValidationError";
import { formatError } from "../../../../lib/error-handling/formatError";

export const updateCustomerEndpoint: Endpoint = {
    path: '/update',
    method: 'post',
    handler: async (req, res) => {
        try {
            if (!req.user) {
                throw new ValidationError('User not found', {
                    user: 'not-found',
                });
            }

            const data = updateCustomerSchema.parse({
                ...req.body,
                mobileNumber: req.body.mobileNumber !== '' ? req.body.mobileNumber : undefined,
                password: req.body.password !== '' ? req.body.password : undefined,
                confirmPassword: req.body.confirmPassword !== '' ? req.body.confirmPassword : undefined,
            });

            if (data.password !== data.confirmPassword) {
                throw new ValidationError('Passwords do not match', {
                    confirmPassword: 'mismatch',
                });
            }

            req.payload.update({
                collection: 'users',
                id: req.user.id,
                data: {
                    fullName: `${data.firstName} ${data.lastName}`,
                    firstLetters: data.firstLetters,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    mobileNumber: data.mobileNumber,
                    shippingAddress: {
                        street: data.shippingAddress.street,
                        houseNumber: data.shippingAddress.houseNumber,
                        houseNumberAddition: data.shippingAddress.houseNumberAddition,
                        city: data.shippingAddress.city,
                        postalCode: data.shippingAddress.postalCode,
                        country: 'NL',
                    },
                }
            });

            return res.status(201).json({
                success: true,
                data: null,
                issues: null,
            });
        } catch (error) {
            return formatError(res, error);
        }
    }
}
import { Endpoint } from "payload/config";
import { registerCustomerSchema } from "./schema";
import { ValidationError } from "../../../../lib/error-handling/errors/ValidationError";
import { formatError } from "../../../../lib/error-handling/formatError";

export const registerCustomerEndpoint: Endpoint = {
    path: '/register',
    method: 'post',
    handler: async (req, res) => {
        try {
            
            const data = registerCustomerSchema.parse({
                ...req.body,
                mobileNumber: req.body.mobileNumber !== '' ? req.body.mobileNumber : undefined,
            });

            if (data.password !== data.confirmPassword) {
                throw new ValidationError('Passwords do not match', {
                    confirmPassword: 'mismatch',
                });
            }

            const user = await req.payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: data.email,
                    }
                },
            }).then((result) => result.docs[0]);

            if (user) {
                throw new ValidationError('Email already in use', {
                    email: 'duplicate',
                });
            }

            req.payload.create({
                collection: 'users',
                data: {
                    name: `${data.firstName} ${data.lastName}`,
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
                    role: 'business-customer',
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
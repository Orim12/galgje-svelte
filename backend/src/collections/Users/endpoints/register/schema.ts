import { X } from "payload/components";
import { z } from "zod";

export const addressSchema = z.object({
    postalCode: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).regex(/^\d{4}\s?[a-zA-Z]{2}$/, {
        message: "invalid",
    }),
    houseNumber: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(1, {
        message: "invalid",
    }),
    houseNumberAddition: z.string({
        invalid_type_error: "invalid",
    }),
    street: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(1, {
        message: "invalid",
    }),
    city: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(1, {
        message: "invalid",
    }),
}, {
    required_error: "required",
    invalid_type_error: "invalid",
})

export const registerCustomerSchema = z.object({
    firstLetters: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(1, {
        message: "invalid",
    }),
    firstName: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(1, {
        message: "invalid",
    }),
    lastName: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(1, {
        message: "invalid",
    }),
    
    mobileNumber: z.string({
        invalid_type_error: "invalid",
    }).min(10, {
        message: "invalid",
    }).optional(),
    email: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).email({
        message: "invalid",
    }),
    password: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(8, {
        message: "invalid",
    }),
    confirmPassword: z.string({
        required_error: "required",
        invalid_type_error: "invalid",
    }).min(8, {
        message: "invalid",
    }),
    shippingAddress: addressSchema,
});


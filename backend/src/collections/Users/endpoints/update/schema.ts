import { z } from "zod";
import { addressSchema } from "../register/schema";

export const updateCustomerSchema = z.object({
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


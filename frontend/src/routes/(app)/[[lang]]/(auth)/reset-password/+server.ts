import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { getClient } from "@src/util/payload-rest-client";
import type { LoginResult, ResetPasswordResult } from "@src/util/payload-rest-client/types";
import type { Customer, User } from "@src/payload-types";
import { z } from "zod";

const resetPasswordSchema = z.object({
    password: z.string({
        required_error: 'required',
        invalid_type_error: 'invalid'
    }).min(8, {
        message: 'invalid'
    }),
    confirmPassword: z.string({
        required_error: 'required',
        invalid_type_error: 'invalid'
    }).min(8, {
        message: 'invalid'
    }),
    token: z.string({
        required_error: 'required',
        invalid_type_error: 'invalid'
    }),
});

export async function POST({ fetch, request, cookies, url }) {
    const client = getClient(fetch, url);
    const data = await request.formData();

    try {

        const { password, confirmPassword, token } = resetPasswordSchema.parse({
            confirmPassword: data.get('confirmPassword'),
            password: data.get('password'),
            token: data.get('token'),
        });

        if (password !== confirmPassword) {
            return json({
                success: false,
                data: null,
                error: null,
                issues: {
                    confirmPassword: "invalid",
                },
            })
        }

        const response: ResetPasswordResult<User> = await client.collections.users["reset-password"]({
            password,
            token,
        })

        if (response.errors) {
            return json({
                success: false,
                data: null,
                error: "unknown",
                issues: null,
            })
        }

        cookies.set('payload-token', response.token, {
            path: '/',
            sameSite: true,
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 3, // 3 days
        })

        return json({
            success: true,
            data: response.user,
            error: null,
            issues: null,
        })
    } catch (e) {
        if (e instanceof z.ZodError) {
            return json({
                success: false,
                data: null,
                error: null,
                issues: e.issues.reduce((acc, issue) => {
                    acc[issue.path.join('.')] = issue.message;
                    return acc;
                }, {})
            })
        }

        return json({
            success: false,
            data: null,
            error: "unknown",
            issues: null,
        })
    }
}
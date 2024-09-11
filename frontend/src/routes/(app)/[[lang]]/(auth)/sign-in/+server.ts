import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { getClient } from "@src/util/payload-rest-client";
import type { LoginResult } from "@src/util/payload-rest-client/types";
import type { Customer, User } from "@src/payload-types";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string({
        required_error: 'required',
        invalid_type_error: 'invalid'
    }).email({
        message: 'invalid'
    }),
    password: z.string({
        required_error: 'required',
        invalid_type_error: 'invalid'
    }).min(8, {
        message: 'invalid'
    })
});

export async function POST({ fetch, request, cookies, url }) {
    const client = getClient(fetch, url);
    const data = await request.formData();

    try {
        const { email, password } = loginSchema.parse({
            email: data.get('email'),
            password: data.get('password'),
        });

        const response: LoginResult<User> = await client.collections.users.login({
            email,
            password,
        });

        if (response.errors) {
            return json({
                success: false,
                data: null,
                error: null,
                issues: {
                    email: "invalid",
                    password: "invalid",
                },
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
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/mongo";
import { admin, jwt } from "better-auth/plugins";
import { z } from "zod";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    plugins: [
        admin({
            defaultRole: "customer",
        }),
        jwt(),

    ],

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                input: false,
                defaultValue: "customer",
            },

            isBlocked: {
                type: "boolean",
                defaultValue: false,
                input: false
            },

            // The only extra field a user may edit (name and image are built in).
            // Empty is allowed. Otherwise: 7 to 15 digits, with an optional +, spaces or dashes.
            phone: {
                type: "string",
                required: false,
                input: true,
                validator: {
                    input: z
                        .string()
                        .trim()
                        .regex(/^(\+?[0-9][0-9\s-]{5,18}[0-9])?$/, "Please enter a valid phone number"),
                },
            }
        }
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },


});
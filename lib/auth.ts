import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/mongo";
import { admin, jwt } from "better-auth/plugins";

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
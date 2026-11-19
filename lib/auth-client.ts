import { createAuthClient } from "better-auth/react"
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth";

// One client for the whole app.
// No baseURL needed: the auth API lives in this same Next.js app.


export const authClient = createAuthClient({

    plugins: [
        inferAdditionalFields<typeof auth>(),
        adminClient()
    ],

})

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { jwtDecode } from "jwt-decode";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    const token = (session as any)?.accessToken || (session as any)?.user?.accessToken;

    let isExpired = false;

    if (!session || !token) {
        isExpired = true;
    } else {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp && decodedToken.exp < currentTime) {
                isExpired = true;
            }
        } catch (error) {
            isExpired = true;
        }
    }

    return { session, token, isExpired };
}
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    const token = (session as any)?.accessToken || (session as any)?.user?.accessToken;

    if (!session || !token) {
        redirect("/api/auth/signin?callbackUrl=/");
    }

    return { session, token };
}
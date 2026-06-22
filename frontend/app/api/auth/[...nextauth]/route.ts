import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // THÊM: Hỗ trợ đăng nhập bằng Email/Password
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                displayName: { label: "Display Name", type: "text" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:8080/api/v1/auth/login-or-register", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.message || "Đăng nhập thất bại");
                    }

                    return {
                        id: data.id,
                        email: data.email,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        role: data.role
                    };
                } catch (e) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user && account?.provider === "credentials") {
                token.id = user.id;
                token.accessToken = (user as any).accessToken;
            }


            if (user && account?.provider === "google") {
                try {
                    const res = await fetch("http://localhost:8080/api/v1/auth/google", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idToken: account.id_token })
                    });

                    if (res.ok) {
                        const data = await res.json();
                        token.id = data.id;
                        token.accessToken = data.accessToken;
                    }
                } catch (error) {
                    console.error("Lỗi lấy token Spring Boot cho Google:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session as any).accessToken = token.accessToken;
                (session as any).refreshToken = token.refreshToken;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
    pages: { signIn: '/login' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
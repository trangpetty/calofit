import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    });

                    const backendTokens = await res.json();

                    if (res.ok && backendTokens) {
                        // Trả về object giả làm user, nhưng thực chất chứa token
                        return {
                            id: "backend-id",
                            email: credentials?.email,
                            accessToken: backendTokens.accessToken,
                            refreshToken: backendTokens.refreshToken,
                            role: backendTokens.role
                        } as any;
                    }
                    return null;
                } catch (e) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            // Xử lý nếu đăng nhập bằng GOOGLE
            if (account && account.provider === "google") {
                try {
                    const res = await fetch("http://localhost:8080/api/v1/auth/google", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idToken: account.id_token }),
                    });
                    const backendTokens = await res.json();
                    if (res.ok && backendTokens) {
                        token.accessToken = backendTokens.accessToken;
                        token.refreshToken = backendTokens.refreshToken;
                        token.role = backendTokens.role;
                    }
                } catch (error) {
                    console.error("Lỗi Google Auth:", error);
                }
            }
            // Xử lý nếu đăng nhập bằng TÀI KHOẢN BÌNH THƯỜNG (Credentials)
            else if (user) {
                token.accessToken = (user as any).accessToken;
                token.refreshToken = (user as any).refreshToken;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            (session.user as any).role = token.role;
            return session;
        },
    },
    session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        // Hàm này chạy ngay sau khi Google xác thực thành công
        async jwt({ token, account }) {
            // Nếu có account nghĩa là user vừa đăng nhập Google xong
            if (account && account.provider === "google") {
                try {
                    // 1. Mang id_token của Google gọi xuống API Spring Boot
                    const res = await fetch("http://localhost:8080/api/v1/auth/google", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idToken: account.id_token }),
                    });

                    const backendTokens = await res.json();

                    if (res.ok && backendTokens) {
                        // 2. Ghi đè accessToken và refreshToken của Spring Boot vào token của NextAuth
                        token.accessToken = backendTokens.accessToken;
                        token.refreshToken = backendTokens.refreshToken;
                        token.role = backendTokens.role;
                    }
                } catch (error) {
                    console.error("Lỗi khi kết nối với Backend Spring Boot:", error);
                }
            }
            return token;
        },

        // Hàm này đẩy token ra ngoài để các Component React có thể lấy được
        async session({ session, token }) {
            // Ép kiểu mở rộng session để chứa token của Backend
            (session as any).accessToken = token.accessToken;
            (session.user as any).role = token.role;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);

// Next.js App Router yêu cầu export GET và POST
export { handler as GET, handler as POST };
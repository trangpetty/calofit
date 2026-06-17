import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Lấy url người dùng đang cố truy cập
        const path = req.nextUrl.pathname;

        // Lấy role từ token
        const role = req.nextauth.token?.role as string;

        // QUY TẮC 1: Vùng PT
        if (path.startsWith("/pt-dashboard") && role !== "PT") {
            // Nếu cố vào trang PT mà không phải PT -> Đẩy về trang báo lỗi hoặc trang chủ
            return NextResponse.rewrite(new URL("/denied", req.url));
        }

        // QUY TẮC 2: Vùng PREMIUM
        if (path.startsWith("/premium") && role !== "PREMIUM" && role !== "PT") {
            // Nếu cố vào trang Premium mà chỉ là FREE -> Đẩy ra trang nâng cấp
            return NextResponse.rewrite(new URL("/upgrade", req.url));
        }

        // Nếu hợp lệ, cho phép đi qua
        return NextResponse.next();
    },
    {
        callbacks: {
            // Hàm này trả về true thì middleware bên trên mới chạy
            // Chỉ cho chạy nếu user đã đăng nhập (có token)
            authorized: ({ token }) => !!token,
        },
    }
);

// Khai báo những đường link nào BẮT BUỘC phải đi qua máy quét Middleware này
export const config = {
    matcher: [
        "/premium/:path*",      // Tất cả các trang bắt đầu bằng /premium
        "/pt-dashboard/:path*", // Tất cả các trang bắt đầu bằng /pt-dashboard
        "/profile/:path*",      // Có thể thêm trang cá nhân vào đây
    ],
};
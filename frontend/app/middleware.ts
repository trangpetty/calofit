// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
//
// export default withAuth(
//     function middleware(req) {
//         const path = req.nextUrl.pathname;
//         const token = req.nextauth.token;
//         const role = token?.role as string;
//
//         if (!token) return NextResponse.next();
//
//         if (path.startsWith("/pt-dashboard") && role !== "PT") {
//             return NextResponse.rewrite(new URL("/denied", req.url));
//         }
//
//         if (path.startsWith("/premium") && role !== "PREMIUM" && role !== "PT") {
//             return NextResponse.rewrite(new URL("/upgrade", req.url));
//         }
//
//         return NextResponse.next();
//     },
// );
//
// // Khai báo những đường link nào BẮT BUỘC phải đi qua máy quét Middleware này
// export const config = {
//     matcher: [
//         "/premium/:path*",      // Tất cả các trang bắt đầu bằng /premium
//         "/pt-dashboard/:path*", // Tất cả các trang bắt đầu bằng /pt-dashboard
//         "/profile/:path*",      // Có thể thêm trang cá nhân vào đây
//     ],
// };
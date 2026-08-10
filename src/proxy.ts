import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }) =>
      req.nextUrl.pathname === "/console/preview" || Boolean(token),
  },
});

// List every route that requires a login
export const config = {
  matcher: [
    "/goals/:path*",
    "/console/:path*",
    "/objectives/:path*",
  ],
};

import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // middleware function
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.roleId !== 5,
    },
  }
);

export const config = { matcher: ["/admin"] };

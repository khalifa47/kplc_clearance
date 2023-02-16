import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      firstName?: string;
      id?: string;
      lastName?: string;
      password?: string;
      roleId?: number;
      statusId?: number;
      exp?: number;
      iat?: number;
      jti?: string;
      sub?: string;
    };
  }
}

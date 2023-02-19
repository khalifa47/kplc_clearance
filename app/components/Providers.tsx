"use client";

import type { Session } from "next-auth";
import { SessionProvider, signIn } from "next-auth/react";

const Providers = ({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) => {
  if (session === null) {
    signIn();
    return <h1>Unauthenticated. Redirecting login page...</h1>;
  }
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;

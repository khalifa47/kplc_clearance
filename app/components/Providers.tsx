"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// import { useRouter } from "next/navigation";

const Providers = ({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) => {
  // const router = useRouter();
  // if (!session) {
  //   router.replace("/login");
  //   return <h1>Unauthenticated. Redirecting login page...</h1>;
  // }
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;

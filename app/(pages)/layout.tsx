import Nav from "@/app/components/Nav";
import { getServerSession } from "next-auth";
import Providers from "@/app/components/Providers";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <html>
      <head />
      <body>
        <div style={{ display: "flex" }}>
          <Providers session={session}>
            <Nav />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

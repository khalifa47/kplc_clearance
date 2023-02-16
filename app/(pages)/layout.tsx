import Nav from "@/app/components/Nav";
import Test from "@/app/components/Test";
import { getServerSession } from "next-auth";
import Providers from "@/app/components/Providers";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // if (session == null) {
  //   signIn();
  // }
  const session = await getServerSession();
  return (
    <html>
      <head />
      <body>
        <div style={{ display: "flex" }}>
          <Providers session={session}>
            <Test />
          </Providers>
          {/* <Nav /> */}
          {/* {children} */}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

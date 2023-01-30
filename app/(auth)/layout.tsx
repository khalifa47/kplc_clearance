export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div
          style={{
            background:
              "linear-gradient(to bottom right, #0c3577, #fece00) center center/cover no-repeat fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: "-8px",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}

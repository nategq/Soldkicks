export const metadata = { title: "Soldkicks" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", margin: 0, padding: 16 }}>
        {children}
      </body>
    </html>
  );
}

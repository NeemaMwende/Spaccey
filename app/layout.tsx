import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Spacey Virtual Era",
  description: "Discover the future of artificial intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

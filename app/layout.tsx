import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased text-white">{children}</body>
    </html>
  );
}

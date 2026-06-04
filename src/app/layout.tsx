import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "BauernPlatform",
  description: "Frische Produkte direkt vom Bauernhof",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-2">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

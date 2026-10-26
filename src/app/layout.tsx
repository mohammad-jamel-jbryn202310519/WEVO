import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "WEVO | تطبيق ومنصة ذكية متعددة المنصات",
  description: "منصة WEVO المتكاملة - موقع وتطبيق للهواتف الذكية (Android & iOS) مع ربط Supabase وسيرفر Hostinger و GitHub.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

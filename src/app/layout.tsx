import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "../styles/globals.css";

const sen = Sen({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sen",
});

export const metadata: Metadata = {
  title: "Yiyara AI",
  description: "Personalized Productivity",
  icons: {
    icon: "/yiyara-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sen.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}

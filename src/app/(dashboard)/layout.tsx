import { MainLayoutWrapper } from "@/app/MainLayoutWrapper";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayoutWrapper>{children}</MainLayoutWrapper>;
}

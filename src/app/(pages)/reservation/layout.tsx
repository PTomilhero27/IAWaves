import { SidebarApp } from "@/app/components/sidebar/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <SidebarApp />
      <div className="w-full p-5">{children}</div>
    </div>
  );
}

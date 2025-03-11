import WorkspaceLayout from "@/components/layouts/WorkspaceLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
}

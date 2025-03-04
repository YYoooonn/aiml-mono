import LeftAisleLayout from "@/components/layouts/LeftAisleLayout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LeftAisleLayout>{children}</LeftAisleLayout>;
}

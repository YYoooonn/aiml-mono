import DefaultLayout from "@/components/layouts/DefaultLayout";
import LeftAisleLayout from "@/components/layouts/LeftAisleLayout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LeftAisleLayout>
      <DefaultLayout>{children}</DefaultLayout>
    </LeftAisleLayout>
  );
}

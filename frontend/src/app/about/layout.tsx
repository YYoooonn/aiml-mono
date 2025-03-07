import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

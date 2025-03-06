import ArchiveCanvas from "./_canvas";

export default async function Archive({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ArchiveCanvas id={id} />;
}

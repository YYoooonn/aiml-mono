"use client";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Projects Page</h1>
      <div>{params.slug}</div>
    </div>
  );
}

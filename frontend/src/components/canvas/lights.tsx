import { Light } from "@/hook/useEditor";

// TODO light adding implementation
export default function Lights({ props }: { props: Light[] }) {
  return (
    <>
      <directionalLight
        intensity={5}
        position={[5, 10, 10]}
        color={"#FFFFFF"}
      />
    </>
  );
}

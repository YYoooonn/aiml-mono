import * as styles from "./page.css";
import LeftAisle from "@/components/aisle/LeftAisle";
import RightAisle from "@/components/aisle/RightAisle";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1> Welcome </h1>
      <Link href={"/login"}>Click to login</Link>
    </>
  );
}

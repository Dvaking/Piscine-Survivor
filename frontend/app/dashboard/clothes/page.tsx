"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "../../Components/Navbar/Navbar";

export default function Customers() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <Navbar />
    </main>
  );
}

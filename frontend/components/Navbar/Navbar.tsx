import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export function Navbar() {
  const router = useRouter();
  const [isCustomer, setIsCustomer] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isTips, setIsTips] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [isSigns, setIsSigns] = useState(false);
  const [isClothes, setIsClothes] = useState(false);

  useEffect(() => {
    setIsDashboard(router.pathname === "/dashboard");
    setIsCustomer(router.pathname === "/dashboard/customers");
    setIsCoach(router.pathname === "/dashboard/coaches");
    setIsSigns(router.pathname === "/dashboard/signs");
    setIsEvents(router.pathname === "/dashboard/events");
    setIsTips(router.pathname === "/dashboard/tips");
    setIsClothes(router.pathname === "/dashboard/clothes");
    setIsClothes(router.pathname === "/dashboard/statistics");
  }, [router]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>Soul Connection</div>
      <ul className={styles.navList}>
        <li>
          <Link
            href="/dashboard/"
            className={isDashboard ? styles.selected : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/coaches"
            className={isCoach ? styles.selected : ""}
          >
            Coaches
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/customers"
            className={isCustomer ? styles.selected : ""}
          >
            Customers
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/signs"
            className={isSigns ? styles.selected : ""}
          >
            Signs
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/tips"
            className={isTips ? styles.selected : ""}
          >
            Tips
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/events"
            className={isEvents ? styles.selected : ""}
          >
            Events
          </Link>
        </li>
        <li>
          <Link href="/dashboard/statistics">Statistics</Link>
        </li>
        <li>
          <Link href="/dashboard/clothes">Clothes</Link>
        </li>
      </ul>
      <div className={styles.language}>
        <span>EN</span>
      </div>
    </nav>
  );
}

export default Navbar;

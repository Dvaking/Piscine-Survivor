import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookie from "js-cookie";
import { logout } from "@hooks";
import { log } from "console";

export function Navbar() {
  const router = useRouter();
  const [isCustomer, setIsCustomer] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isTips, setIsTips] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [isSigns, setIsSigns] = useState(false);
  const [isClothes, setIsClothes] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    setIsDashboard(router.pathname === "/dashboard");
    setIsCustomer(router.pathname === "/dashboard/customers");
    setIsEmployee(router.pathname === "/dashboard/employees");
    setIsSigns(router.pathname === "/dashboard/signs");
    setIsEvents(router.pathname === "/dashboard/events");
    setIsTips(router.pathname === "/dashboard/tips");
    setIsClothes(router.pathname === "/dashboard/clothes");
    setIsClothes(router.pathname === "/dashboard/statistics");
    setIsManager(Cookie.get("role") === "admin" || Cookie.get("role") === "manager" );
  }, [router]);

  const disconnect = async () => {
    try {
      const success = await logout();

      if (success) {
        router.push("/login");
      } else {
        console.error("Error during logout");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

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
        {isManager && (
          <li>
            <Link
              href="/dashboard/employees"
              className={isEmployee ? styles.selected : ""}
            >
              Employees
            </Link>
          </li>
        )}
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
        {isManager && (
          <li>
            <Link href="/dashboard/statistics">Statistics</Link>
          </li>
        )}
        <li>
          <Link href="/dashboard/clothes">Clothes</Link>
        </li>
      </ul>
      <div className={styles.language}>
        <div>
          <span>EN</span>
        </div>
        <div>
          <button onClick={() => disconnect()}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

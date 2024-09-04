"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import 'bulma/css/bulma.css';
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleTipsClick = () => {
    router.push("/dashboard/tips");
  };
  const handleStaticticsClick = () => {
    router.push("/dashboard/statistics");
  }
  const handleAccountsClick = () => {
    router.push("/dashboard/account_man");
  };
  const handleDashboardClick = () => {
    router.push("/dashboard");
  };
  return (
      <main className={styles.main}>
        <nav className="navbar is-fixed-top">
          <div className="navbar-brand">
            <a className="navbar-item">
              <strong>Soul Connection</strong>
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <a className="button">Customers</a>
              <a className="button">Events</a>
              <a className="button is-link" onClick={handleDashboardClick}>Dashboard</a>
              <a className="button is-link" onClick={handleStaticticsClick}>Statictics</a>
              <a className="button is-link" onClick={handleTipsClick}>Tips</a>
              <a className="button is-link" onClick={handleAccountsClick}>Accounts</a>
            </div>
            <div className="navbar-item">
              <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" />
            </div>
          </div>
        </nav>
        <div className={styles.heading}>
          <div className={styles.title}>
            <h1>Employee List</h1> {/* Have it change from employee to coach when filter is applied */}
            <p>You have 87 employees</p> {/* Have it change from employees to coach when filter is applied. Number changes as well */}
          </div>
          <div className={styles.addAccount}>
            <button className="button is-link is-medium">+</button>
          </div>
        </div>
        <div className={styles.containerBg}>
          <div className={styles.container}>
            {/* add filter all, coaches, employees filter buttons (maybe) */}
            <div className={styles.category}>
              <p>Employee</p> {/* Change to coach when filter is applied */}
              <p>Email</p>
              <p>Phone</p>
              <p>Number of Customers</p>
              <p>Actions</p> {/* Turn into  */}
            </div>
          </div>
        </div>
      </main>
  );
}

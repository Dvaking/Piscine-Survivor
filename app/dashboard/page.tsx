"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import 'bulma/css/bulma.css';
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleCustomersClick = () => {
    router.push("/dashboard/customers");
  };
  const handleTipsClick = () => {
    router.push("/dashboard/tips");
  };
  const handleStaticticsClick = () => {
    router.push("/dashboard/statistics");
  }
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
              <a className="button is-link" onClick={handleCustomersClick}>Customers</a>
              <a className="button">Events</a>
              <a className="button is-link" onClick={handleDashboardClick}>Dashboard</a>
              <a className="button is-link" onClick={handleStaticticsClick}>Statictics</a>
              <a className="button is-link" onClick={handleTipsClick}>Tips</a>
              <a className="button">Accounts</a>
            </div>
            <div className="navbar-item">
              <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" />
            </div>
          </div>
        </nav>
        <div className={styles.heading}>
          <h1>Dashboard</h1>
          <p>Welcome!</p>
        </div>
        <div className={styles.firstCharts}>
          <div className="card">
            Number of customers per month chart
          </div>
          <div className="card">
            Events chart
          </div>
        </div>
        <div className={styles.secondCharts}>
          <div className="card">
            Customers by country map
          </div>
          <div className="card">
            Meetings top sources pie chart
          </div>
        </div>
      </main>
  );
}

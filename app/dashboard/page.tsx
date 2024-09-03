"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

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
              <a className="button">Customers</a>
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
        {/* div 1 */}
        <div className={styles.firstCharts}>
          <div className="box">
            Number of customers per month chart
          </div>
          <div className="box">
            Events chart
          </div>
        </div>
        {/* box 1 */}
        {/* box 2 */}
        {/* div 2 */}
        {/* box 3 */}
        {/* box 4 */}
      </main>
  );
}

"use client";
import { useRouter } from "next/navigation";
import Navbar from '../Components/Navbar/Navbar';
import styles from "./page.module.css";
import "bulma/css/bulma.css";

export default function Home() {
  return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.heading}>
          <h1>Dashboard</h1>
          <p>Welcome!</p>
        </div>
        <div className={styles.firstCharts}>
          <div>
            Number of customers per month chart
          </div>
          <div>
            Events chart
          </div>
        </div>
        <div className={styles.secondCharts}>
          <div>
            Customers by country map
          </div>
          <div>
            Meetings top sources pie chart
          </div>
        </div>
    </main>
  );
}

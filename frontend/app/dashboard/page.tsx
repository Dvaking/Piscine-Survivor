"use client";
import { useRouter } from "next/navigation";
import Navbar from '../Components/Navbar/Navbar';
import styles from "./page.module.css";
import "bulma/css/bulma.css";

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
  };
  const handleAccountsClick = () => {
    router.push("/dashboard/account_man");
  };
  const handleDashboardClick = () => {
    router.push("/dashboard");
  };
  return (
      <main className={styles.main}>
        <Navbar />
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

"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import 'bulma/css/bulma.css';
import Image from "next/image";
import Navbar from '../../Components/Navbar/Navbar';

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
        <Navbar />
        <div className={styles.heading}>
          <div className={styles.title}>
            <h1>Employee List</h1> {/* Have it change from employee to coach when filter is applied */}
            <p>You have 87 employees</p> {/* Have it change from employees to coach when filter is applied. Number changes as well */}
          </div>
          <div className={styles.addAccount}>
            <button className="button is-link is-medium">+</button> {/* Add a new employee */}
          </div>
        </div>
        <div className={styles.containerBg}>
          <div className={styles.container}>
            <div className={styles.filter}>
              <div className="button is-link is-rounded">All</div>
              <div className="button is-rounded">Coaches</div>
              <div className="button is-rounded">Admins</div>
            </div>
            <div className={styles.category}>
              <p>Employee</p> {/* Change to coach when filter is applied */}
              <p>Email</p>
              <p>Phone</p>
              <p>Number of Customers</p>
              <p>Actions</p>
            </div>
            <div className={styles.employee}>
              {/* profile picture */}
              <p><strong>Firstname LastName</strong></p>
              <p>Email Address</p>
              <p>Phone Number</p>
              <p>No.</p>
              <p>...</p> {/* Turn into button that lets you assign a customer to employee */}
            </div>
          </div>
        </div>
      </main>
  );
}

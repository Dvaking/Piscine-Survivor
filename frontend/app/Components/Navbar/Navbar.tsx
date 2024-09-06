"use client";

import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import Image from "next/image";
import "bulma/css/bulma.css";

export default function Navbar() {
  const router = useRouter();

  const handleClick = (categories: string) => {
    if (categories === "clothes") router.push("../../dashboard/clothes");
    else if (categories === "customers")
      router.push("../../dashboard/customers");
    else if (categories === "statistics")
      router.push("../../dashboard/statistics");
    else if (categories === "coaches")
      router.push("../../dashboard/account_man");
    else if (categories === "client_profile")
      router.push("../../dashboard/client_profile");
    else if (categories === "tips") router.push("../../dashboard/tips");
    else if (categories === "signs") router.push("../../dashboard/signs");
    else if (categories === "dashboard") router.push("../../dashboard");
  };

  return (
    <div className={styles.bar}>
      <nav className="navbar is-fixed-top">
        <div className={styles.companyName}>
        <div className="navbar-brand">
          <p className="navbar-item">
            <strong>Soul Connection</strong>
          </p>
        </div>
        </div>
        <div className={styles.navbarLinks}>
          <div className="navbar-item">
            <a onClick={() => handleClick("dashboard")}>Dashboard</a>
          </div>
          <div className="navbar-item">
            <a onClick={() => handleClick("coaches")}>Coaches</a>
          </div>
          <div className="navbar-item">
            <a onClick={() => handleClick("customers")}>Customers</a>
          </div>
          <div className="navbar-item">
            <a onClick={() => handleClick("tips")}>Tips</a>
          </div>
          <div className="navbar-item">
            <a onClick={() => handleClick("client_profile")}>Client Profile</a>
          </div>
          <div className="navbar-item">
            <a onClick={() => handleClick("statistics")}>Statistics</a>
          </div>
          <div className="navbar-item">
            <a>Events</a>
          </div>
          <div className="navbar-item">
            <a onClick={() => handleClick("clothes")}>Clothes</a>
          </div>
          <div className="navbar-item">
            <a onClick={() => handleClick("signs")}>Signs</a>
          </div>
          <div className="navbar-item">
            <img
              className="is-rounded"
              src="https://bulma.io/assets/images/placeholders/128x128.png"
            />
            </div>
          </div>
      </nav>
    </div>
  );
}

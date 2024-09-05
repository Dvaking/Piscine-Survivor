"use client";

import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import Image from "next/image";
import "bulma/css/bulma.css";

export default function Navbar() {
  const router = useRouter();

  const handleCustomersClick = () => {
    router.push("../../dashboard/customers");
  };
  const handleTipsClick = () => {
    router.push("../../dashboard/tips");
  };
  const handleStaticticsClick = () => {
    router.push("../../dashboard/statistics");
  };
  const handleAccountsClick = () => {
    router.push("../../dashboard/account_man");
  };
  const handleClientProfileClick = () => {
    router.push("../../dashboard/client_profile");
  };
  const handleSignsClick = () => {
    router.push("../../dashboard/signs");
  };
  const handleDashboardClick = () => {
    router.push("../../dashboard");
  };

  return (
    <div className={styles.bar}>
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand is-hidden-mobile">
          <p className="navbar-item">
            <strong>Soul Connection</strong>
          </p>
        </div>
        <div className={styles.navbarLinks}>
          <div className="navbar-item">
            <a onClick={handleClientProfileClick}>Client Profile</a>
          </div>
          <div className="navbar-item">
            <a onClick={handleDashboardClick}>Dashboard</a>
          </div>
          <div className="navbar-item">
            <a onClick={handleCustomersClick}>Customers</a>
          </div>
          <div className="navbar-item">
            <a onClick={handleTipsClick}>Tips</a>
          </div>
          <div className="navbar-item">
            <a onClick={handleStaticticsClick}>Statictics</a>
          </div>
          <div className="navbar-item">
            <a>Events</a>
          </div>
          <div className="navbar-item">
            <a onClick={handleAccountsClick}>Accounts</a>
          </div>
          <div className="navbar-item">
            <a onClick={handleSignsClick}>Signs</a>
          </div>
        </div>
        <div className="navbar-end is-hidden-mobile">
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

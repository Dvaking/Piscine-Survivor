"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import "bulma/css/bulma.css";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

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
  const handleDashboardClick = () => {
    router.push("../../dashboard");
  };

  return (
    <div className={styles.bar}>
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <strong>Soul Connection</strong>
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={handleBurgerClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <a className="navbar-item" onClick={handleDashboardClick}>
              Dashboard
            </a>
            <a className="navbar-item" onClick={handleCustomersClick}>
              Customers
            </a>
            <a className="navbar-item" onClick={handleTipsClick}>
              Tips
            </a>
            <a className="navbar-item" onClick={handleStaticticsClick}>
              Statistics
            </a>
            <a className="navbar-item">Events</a>
            <a className="navbar-item" onClick={handleAccountsClick}>
              Accounts
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <img
                className="is-rounded"
                src="https://bulma.io/assets/images/placeholders/128x128.png"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

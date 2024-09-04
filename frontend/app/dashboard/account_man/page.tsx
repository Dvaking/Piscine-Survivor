"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../../Components/Navbar/Navbar";

export default function Home() {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;

    if (dropdown) {
      const trigger = dropdown.querySelector(
        ".dropdown-trigger"
      ) as HTMLDivElement | null;

      const handleClick = (event: MouseEvent) => {
        event.stopPropagation();
        console.log("Dropdown clicked");
        dropdown.classList.toggle("is-active");
        console.log(
          "Dropdown class toggled:",
          dropdown.classList.contains("is-active")
        );
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (dropdown && !dropdown.contains(event.target as Node)) {
          dropdown.classList.remove("is-active");
        }
      };

      if (trigger) {
        trigger.addEventListener("click", handleClick);
      }

      document.addEventListener("click", handleClickOutside);

      return () => {
        if (trigger) {
          trigger.removeEventListener("click", handleClick);
        }
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.heading}>
        <div className={styles.title}>
          <h1>Employee List</h1>
          <p>You have 87 employees</p>
        </div>
        <div className={styles.exportAddButtons}>
          <div>
            <button className="button is-medium">Export</button>
          </div>
          <div>
            <button className="button is-link is-medium">+</button>
          </div>
        </div>
      </div>
      <div className={styles.containerBg}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <div className="dropdown" ref={dropdownRef}>
              <div className="dropdown-trigger">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <span>Bulk Action</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item">Insert here</div>
                  <hr className="dropdown-divider" />
                  <div className="dropdown-item">Insert here</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.category}>
            <p>Employee</p>
            <p>Email</p>
            <p>Phone</p>
            <p>Number of Customers</p>
            <p>Actions</p>
          </div>
          <div className={styles.employee}>
            <p>
              <strong>Firstname LastName</strong>
            </p>
            <p>Email Address</p>
            <p>Phone Number</p>
            <p>No.</p>
            <p>...</p>
          </div>
        </div>
      </div>
    </main>
  );
}

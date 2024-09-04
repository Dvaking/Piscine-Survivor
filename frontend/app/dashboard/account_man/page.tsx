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
            <div className={styles.dropApply}>
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
              <div>
                <a className="button is-static">Apply</a>
              </div>
            </div>
            <div className={styles.icons}>
              <i className="fas fa-search" aria-hidden="true"></i>
              <i className="fas fa-sort-amount-down" aria-hidden="true"></i>
              <i className="fas fa-cog" aria-hidden="true"></i>
            </div>
          </div>
          <div className={styles.category}>
            <div className={styles.checkName}>
              <i className="far fa-square"></i>
              Employee
            </div>
            <div>
              Email
            </div>
            <div>
              Phone
            </div>
            <div>
              Number of Customers
            </div>
            <div>
              <p className={styles.actions}>Actions</p>
            </div>
          </div>
          <div className={styles.employee}>
            <div className={styles.checkName}>
              <i className="far fa-square"></i>
              <p>
                <strong>Firstname LastName</strong>
              </p>
            </div>
            <div>
              Email Address
            </div>
            <div>
              Phone Number
            </div>
            <div>
              No.
            </div>
            <div>
              <button className={styles.actions}>
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

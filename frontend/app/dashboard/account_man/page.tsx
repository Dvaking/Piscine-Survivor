"use client";

import { useEffect, useRef } from "react";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import styles from "./page.module.css";
import "bulma/css/bulma.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../../Components/Navbar/Navbar";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!user) router.push("/");

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

  const [isPopupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleNameClick = (name: string) => {
    setSelectedName(name);
    setDropdownOpen(false);
  };

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
            <button className="button is-link is-large" onClick={togglePopup}>
            <i className="fas fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>New Employee</h2>
            <form>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    className="input"
                    type="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Job</label>
                <div className="control">
                  <input
                    className="input"
                    type="job"
                    placeholder="Enter your job type (ex: coach)"
                  />
                </div>
              </div>
              <div className="field">
                <div className={styles.formButtons}>
                  <div>
                    <button className="button is-link" type="submit">
                      Save
                    </button>
                  </div>
                  <div>
                    <button
                      className="button"
                      type="button"
                      onClick={togglePopup}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <div className="button is-static">Apply</div>
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
            <div>Email</div>
            <div>Phone</div>
            <div>Number of Customers</div>
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
            <div>Email Address</div>
            <div>Phone Number</div>
            <div>No.</div>
            <div className={styles.addClientButton}>
              <button className={styles.actions} onClick={toggleDropdown}>
                <i className="fas fa-ellipsis-h"></i>
              </button>
              {isDropdownOpen && (
            <div className={styles.dropdown}>
              <ul>
                {names.map((name, index) => (
                  <li
                    key={index}
                    onClick={() => handleNameClick(name)}
                    className={styles.listItem}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

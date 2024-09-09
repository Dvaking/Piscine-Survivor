<<<<<<< HEAD:frontend/app/dashboard/customers/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@components";
import React, { useState } from "react";
import styles from "./page.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
          <h1>Customers List</h1>
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
=======
import { useRouter } from "next/navigation";
import styles from "@styles/CustomersPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Customers() {
  const router = useRouter();

  return (
    <div className={`${styles.container} mt-6`}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Customers Details</h1>
        <button className={styles.backButton} onClick={() => router.back()}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
>>>>>>> b9d18f75748cc1dac7724191fe1834254e71d143:frontend/pages/dashboard/customers/[uuid]/index.tsx
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
<<<<<<< HEAD:frontend/app/dashboard/customers/page.tsx
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
=======

          <div className="column">
            <div className="box">
              <h3 className="title is-5">Recent Meetings</h3>
              <div className="box">
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Rating</th>
                      <th>Report</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>23 Jul, 2024</strong>
                      </td>
                      <td>⭐⭐⭐⭐⭐</td>
                      <td>A very good moment!</td>
                      <td>
                        <span className="tag is-warning">Dating App</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>21 Jul, 2024</strong>
                      </td>
                      <td>⭐⭐⭐</td>
                      <td>She was a very good person but not my type.</td>
                      <td>
                        <span className="tag is-success">Friends</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>19 Jun, 2024</strong>
                      </td>
                      <td>⭐</td>
                      <td>The meeting was not good, she was not interested.</td>
                      <td>
                        <span className="tag is-warning">Dating App</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>02 Jun, 2024</strong>
                      </td>
                      <td>⭐⭐⭐</td>
                      <td>Not bad, but not good.</td>
                      <td>
                        <span className="tag is-warning">Dating App</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12 May, 2024</strong>
                      </td>
                      <td>⭐⭐⭐⭐</td>
                      <td>Need to see her again, she was interesting.</td>
                      <td>
                        <span className="tag is-info">Social Network</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="title is-5">Payments History</h3>
              <div className="box mt-5">
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Payment Method</th>
                      <th>Amount</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>20 Jul, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>20 Jun, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>20 May, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>20 Apr, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                  </tbody>
                </table>
              </div>
>>>>>>> b9d18f75748cc1dac7724191fe1834254e71d143:frontend/pages/dashboard/customers/[uuid]/index.tsx
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

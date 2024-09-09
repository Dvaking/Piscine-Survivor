import { useEffect, useRef } from "react";
import React, { useState } from "react";
import styles from "@styles/CustomersPage.module.css";
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

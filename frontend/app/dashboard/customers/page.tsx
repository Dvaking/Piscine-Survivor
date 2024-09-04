"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "../../Components/Navbar/Navbar";

export default function Customers() {
  const router = useRouter();

  const handleCustomersClick = () => {
    router.push("/dashboard/customers");
  };
  const handleTipsClick = () => {
    router.push("../dashboard/tips");
  };
  const handleStaticticsClick = () => {
    router.push("../dashboard/statistics");
  };
  const handleDashboardClick = () => {
    router.push("../dashboard");
  };

  return (
    <main className={styles.pageBackground}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.hasMarginTop}>
              <div className={styles.box}>
                <figure className={styles.imageWrapper}>
                  <img
                    className={styles.profileImage}
                    src="path-to-profile-pic.jpg"
                    alt="Profile"
                  />
                </figure>
                <h1 className={styles.title}>NAME_CUSTOMER</h1>
                <p className={styles.seperate} />
                <div className={styles.buttonGroup}>
                  <button className={styles.button}>
                    <span className={styles.icon}>
                      <i className="fas fa-envelope"></i>
                    </span>
                  </button>
                  <button className={styles.button}>
                    <span className={styles.icon}>
                      <i className="fas fa-bookmark"></i>
                    </span>
                  </button>
                </div>
                <p className={styles.seperate} />
                <div className={styles.content}>
                  <p>
                    <strong>Total Encounters:</strong> 23
                  </p>
                  <p>
                    <strong>Positives:</strong> 20
                  </p>
                  <p>
                    <strong>In Progress:</strong> 3
                  </p>
                  <p className={styles.seperate} />
                  <p>
                    <strong>User ID:</strong> NUMBER_ID
                  </p>
                  <p>
                    <strong>Email:</strong> EMAIL_CUSTOMER
                  </p>
                  <p>
                    <strong>Address:</strong> ADDRESS_CUSTOMER
                  </p>
                  <p>
                    <strong>Last Activity:</strong> ACTIVITY_CUSTOMER
                  </p>
                  <p>
                    <strong>Coach:</strong> NAME_CUSTOMER_COACH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Meetings and Payments */}
        <div className="column">
          <div className="box">
            <h2 className="title is-5">Recent Meetings</h2>
            <table className="table is-fullwidth">
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
                  <td>23 Jul, 2024</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>A very good moment!</td>
                  <td>
                    <span className="tag is-warning">Dating App</span>
                  </td>
                </tr>
                <tr>
                  <td>21 Jul, 2024</td>
                  <td>⭐⭐⭐</td>
                  <td>She was very good person but not my type.</td>
                  <td>
                    <span className="tag is-success">Friends</span>
                  </td>
                </tr>
                <tr>
                  <td>19 Jun, 2024</td>
                  <td>⭐</td>
                  <td>The meeting was not good, she was not interested.</td>
                  <td>
                    <span className="tag is-warning">Dating App</span>
                  </td>
                </tr>
                <tr>
                  <td>02 Jun, 2024</td>
                  <td>⭐⭐</td>
                  <td>Not bad, but not good.</td>
                  <td>
                    <span className="tag is-warning">Dating App</span>
                  </td>
                </tr>
                <tr>
                  <td>12 May, 2024</td>
                  <td>⭐⭐⭐</td>
                  <td>Need to see her again, she was interesting.</td>
                  <td>
                    <span className="tag is-info">Social Network</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

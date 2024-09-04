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
                <p className={styles.seperate}/>
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
                <p className={styles.seperate}/>
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
                  <p className={styles.seperate}/>
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
      </div>
    </main>
  );
}

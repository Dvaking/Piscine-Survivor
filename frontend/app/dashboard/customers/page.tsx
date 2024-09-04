"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import "bulma/css/bulma.css";

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
    <main className={styles.main}>
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand">
          <a className="navbar-item">
            <strong>Soul Connection</strong>
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <a className="button is-link" onClick={handleCustomersClick}>
              Customers
            </a>
            <a className="button">Events</a>
            <a className="button is-link" onClick={handleDashboardClick}>
              Dashboard
            </a>
            <a className="button is-link" onClick={handleStaticticsClick}>
              Statictics
            </a>
            <a className="button is-link" onClick={handleTipsClick}>
              Tips
            </a>
            <a className="button">Accounts</a>
          </div>
          <div className="navbar-item">
            <img
              className="is-rounded"
              src="https://bulma.io/assets/images/placeholders/128x128.png"
            />
          </div>
        </div>
      </nav>

      <div className={styles.pageBackground}>
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter">
              <div className="box">
                <figure className="image is-128x128">
                  <img
                    className="is-rounded"
                    src="path-to-profile-pic.jpg"
                    alt="Profile"
                  />
                </figure>
                <h1 className="title is-4 has-text-centered">
                  NAME_CUSTOMER
                </h1>
                <div className="has-text-centered">
                  <button className="button is-small is-light">
                    <span className="icon">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </button>
                  <button className="button is-small is-light">
                    <span className="icon">
                      <i className="fas fa-bookmark"></i>
                    </span>
                  </button>
                </div>
                <hr />
                <div className="content">
                  <p>
                    <strong>Total Encounters:</strong> 23
                  </p>
                  <p>
                    <strong>Positives:</strong> 20
                  </p>
                  <p>
                    <strong>In Progress:</strong> 3
                  </p>
                  <hr />
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

import styles from "@styles/DashboardPage.module.css";
import "bulma/css/bulma.css";
import { use, useEffect } from "react";
import Cookies from "js-cookie";
import router from "next/router";

export default function Dashborad() {

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <main>
      <div className={styles.heading}>
        <h1>Dashboard</h1>
        <p>Welcome!</p>
      </div>

      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-half">
            <div className="box has-background-black has-text-white">
              <p>Customer overview</p>
            </div>
          </div>
          <div className="column is-half">
            <div className="box has-background-black has-text-white">
              <p>Events</p>
            </div>
          </div>

          <div className="column is-half">
            <div className="box has-background-black has-text-white">
              <p>Customers by country</p>
            </div>
          </div>
          <div className="column is-half">
            <div className="box has-background-black has-text-white">
              <p>Meetings top sources</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

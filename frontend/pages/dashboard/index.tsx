import styles from "@styles/DashboardPage.module.css";
import "bulma/css/bulma.css";

export default function Dashborad() {
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

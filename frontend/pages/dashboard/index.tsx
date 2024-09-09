import styles from "@styles/DashboardPage.module.css";
import "bulma/css/bulma.css";

export default function Dashborad() {
  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>Dashboard</h1>
        <p>Welcome!</p>
      </div>
      <div className={styles.firstCharts}>
        <div>Number of customers per month chart</div>
        <div>Events chart</div>
      </div>
      <div className={styles.secondCharts}>
        <div>Customers by country map</div>
        <div>Meetings top sources pie chart</div>
      </div>
    </main>
  );
}

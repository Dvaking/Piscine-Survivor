import Link from "next/link";
import styles from "./Navbar.module.css";
import "bulma/css/bulma.css";

export function Navbar() {

  return (
    <div className={styles.bar}>
      <nav className="navbar is-fixed-top">
        <div className={styles.companyName}>
          <div className="navbar-brand">
            <p className="navbar-item">
              <strong>Soul Connection</strong>
            </p>
          </div>
        </div>
        <div className={styles.navbarLinks}>
          <div className="navbar-item">
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className="navbar-item">
            <Link href="/dashboard/customers">Customers</Link>
          </div>
          <div className="navbar-item">
            <Link href="/dashboard/account_man">Coach</Link>
          </div>
          <div className="navbar-item">
            <Link href="/dashboard/tips">Tips</Link>
          </div>
          <div className="navbar-item">
            <Link href="/dashboard/statistics">Statistics</Link>
          </div>
          <div className="navbar-item">
            <Link href="/dashboard/clothes">Clothes</Link>
          </div>
          <div className="navbar-item">
            <Link href="/dashboard/signs">Signs</Link>
          </div>
        </div>
        <div className="navbar-end">
          <div className={styles.profilePic}>
            <div className="navbar-item">
              <img
                className="is-rounded"
                src="https://bulma.io/assets/images/placeholders/128x128.png"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

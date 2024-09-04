"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import 'bulma/css/bulma.css';
import Image from "next/image";

export default function Tips() {
  const router = useRouter();

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
              <a className="button">Customers</a>
              <a className="button">Events</a>
              <a className="button is-link" onClick={handleDashboardClick}>Dashboard</a>
              <a className="button is-link" onClick={handleStaticticsClick}>Statictics</a>
              <a className="button is-link" onClick={handleTipsClick}>Tips</a>
              <a className="button">Accounts</a>
            </div>
            <div className="navbar-item">
              <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" />
            </div>
          </div>
        </nav>

      <div className={styles.pageBackground}>
      <div className={styles.tips}>
        <div className={styles.tipsContainer}>
          <h1 className={styles.title}>Tips for Coaches</h1>

          <div className={styles.tipsBox}>
            <details className={styles.dropdown}>
              <summary>Help to choose the right clothes</summary>
              <p>
                It is important to choose the right clothes for the first date.
                The first impression is very important. The first thing that a
                person sees is the appearance. It is important to choose the
                right clothes for the first date. The first impression is very
                important. The first thing that a person sees is the appearance.
              </p>
            </details>
            <details className={styles.dropdown}>
              <summary>How to choose the right perfume?</summary>
              <p>
                Platea imperdiet nam odio posuere est nulla neque. Nec
                pellentesque tristique tempus felis vitae bibendum dolor
                maecenas.
              </p>
            </details>
            <details className={styles.dropdown}>
              <summary>Some dating app tips</summary>
              <p>
                Habitant egestas ligula magnis pretium tortor enim. Scelerisque
                ante blandit egestas bibendum a maecenas.
              </p>
            </details>
            <details className={styles.dropdown}>
              <summary>How to choose a good place for a date?</summary>
              <p>
                Convallis pretium pretium nascetur felis donec! Aliquet nisi
                torquent bibendum tristique tellus tincidunt bibendum magnis.
              </p>
            </details>
            <details className={styles.dropdown}>
              <summary>How to choose photos for a dating profile?</summary>
              <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Tortor nibh
                integer placerat vitae porttitor vitae.
              </p>
            </details>
          </div>
        </div>
        </div>
        </div>
      </main>
  );
}

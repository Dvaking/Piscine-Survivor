"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const aboutUsRef = useRef(null);
  const statisticsRef = useRef(null);
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };
  const scrollToSection = (ref:any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <body>
      <main className={styles.main}>
        <nav className="navbar is-fixed-top">
          <div className="navbar-brand">
            <a className="navbar-item">
            - insert logo here -
            </a>
          </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <a className="button is-link" onClick={handleLoginClick}>Log in</a>
              </div>
            </div>
        </nav>
        <div className={styles.heading}>
          <div className={styles.title}>
            <h1>Soul Connection</h1>
          </div>
          <div className={styles.buttons}>
            <button className="button is-outlined is-large" onClick={() => scrollToSection(aboutUsRef)}>About Us</button>
            <button className="button is-outlined is-large" onClick={() => scrollToSection(statisticsRef)}>Statistics</button>
          </div>
        </div>
        <section ref={aboutUsRef}>
          <h2>About Us</h2>
          <p>Bla bla bla...</p>
        </section>
        <section ref={statisticsRef}>
          <h2>Statistics</h2>
          <p>Bla bla bla...</p>
        </section>
      </main>
    </body>
  );
}

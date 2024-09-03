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
  const handleTipsClick = () => {
    router.push("/tips");
  };
  const handleStaticticsClick = () => {
    router.push("/statistics");
  }
  const handleDashboardClick = () => {
    router.push("/dashboard");
  };
  const scrollToSection = (ref:any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className={styles.main}>
      <nav className="navbar is-fixed-top is-flex-mobile is-flex">
        <div className="navbar-brand">
          <a className="navbar-item is-hidden-mobile">
          - insert logo here -
          </a>
        </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <a className="button is-link" onClick={handleStaticticsClick}>Statictics</a>
              <a className="button is-link" onClick={handleDashboardClick}>Dashboard</a>
              <a className="button is-link" onClick={handleTipsClick}>Tips</a>
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
        <div className={styles.aboutUs}>
        <div className="box">
          <p>
            Ullamco enim culpa magna voluptate occaecat eu magna. Ipsum commodo elit fugiat proident anim voluptate ipsum quis nulla elit labore irure anim occaecat. Magna aliqua enim id aliqua minim aliquip et. Elit irure aute reprehenderit voluptate tempor amet deserunt elit mollit ullamco adipisicing adipisicing enim enim. Lorem laboris occaecat aliquip eiusmod. Magna cupidatat adipisicing deserunt sint sunt id mollit laborum tempor culpa. Mollit officia officia nostrud incididunt irure consequat elit. Voluptate in adipisicing mollit dolor. Consectetur consectetur quis aute occaecat veniam nulla. Labore qui fugiat nulla officia consectetur enim enim fugiat proident ipsum sit incididunt. Mollit magna duis ipsum dolore sunt proident ea aute. Magna nisi nisi in sint. Minim commodo aute irure sint. Dolor et elit veniam pariatur consequat cupidatat est eiusmod et ipsum commodo reprehenderit sint. Laborum commodo deserunt commodo ut elit ad labore esse nostrud. Est enim et Lorem mollit quis pariatur veniam consectetur reprehenderit do. Eu non amet est deserunt.Sint ex eiusmod duis sint adipisicing aliquip nulla aliqua est ullamco laborum aute mollit deserunt. Officia fugiat est labore sint eiusmod id commodo aliquip veniam aliquip. Qui Lorem est esse magna aliquip consectetur excepteur id sint. Nostrud dolor aliqua laborum amet non nisi adipisicing qui. Voluptate pariatur anim proident est esse qui cupidatat pariatur est commodo occaecat incididunt.
          </p>
        </div>
        </div>
      </section>
      <section ref={statisticsRef} style={{backgroundColor: 'aliceblue'}}>
        <div className={styles.stats}>
          <div className="box">
            <h2>4 million</h2>
            <p>Clients worldwide.<br/>Adipisicing sint anim occaecat laborum. Est nisi ipsum nulla adipisicing cillum duis esse. Veniam quis dolor veniam labore labore id velit..</p>
          </div>
          <div className="box">
          <h2>1 million</h2>
          <p>Certified coaches available at all times.<br/>Adipisicing sint anim occaecat laborum. Est nisi ipsum nulla adipisicing cillum duis esse. Veniam quis dolor veniam labore labore id velit..</p>
          </div>
          <div className="box">
          <h2>6 million</h2>
          <p>Successful meetings confirmed.<br/>Adipisicing sint anim occaecat laborum. Est nisi ipsum nulla adipisicing cillum duis esse. Veniam quis dolor veniam labore labore id velit..</p>
          </div>
        </div>
      </section>
    </main>
  );
}
import styles from "./page.module.css";

export default function Login() {
  return (
    <main className={styles.LoginPage}>
      <div className={styles.Mail}>
          <input className="input" type="email" placeholder="Email" />
      </div>
      <div className={styles.Password}>
          <input className="input" type="password" placeholder="Password" />
      </div>
      <div className={styles.Login}>
          <button className="button is-success is-dark is-large">Login</button>
      </div>
    </main>
  );
}
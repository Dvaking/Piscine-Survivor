"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import "bulma/css/bulma.css";
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };
  return (
    <main className={styles.login}>
      <div className={styles.loginContainer}>
        <h4 className={styles.title}>Login to your account</h4>

        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>E-mail address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              Remember me
            </label>
            <button className={styles.buttonText}>Forgot your password?</button>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.buttonLink}
              onClick={handleDashboardClick}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

"use client";
import "bulma/css/bulma.css";
import styles from "./page.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user } = useUser();
  const router = useRouter();

  if (user) router.push("/dashboard");

  return (
    <main className={styles.login}>
      <div className={styles.loginContainer}>
        <h4 className={styles.title}>Login to access the web application</h4>
        <div className={styles.buttonLink}>
        <a href="/api/auth/login">
          <div className={styles.buttonText}>Login</div>
        </a>
      </div>
      </div>
    </main>
  );
}

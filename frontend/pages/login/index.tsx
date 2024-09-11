import { useRouter } from "next/navigation";
import "bulma/css/bulma.css";
import styles from "@styles/LoginPage.module.css";
import { login } from "@hooks";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDashboardClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const success = await login(email, password);

      if (success) {
        setErrorMessage("");
        router.push("/dashboard");
      } else {
        setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <main className={styles.login}>
      <div className={styles.loginContainer}>
        <h4 className={styles.title}>Login to your account</h4>

        <form className={styles.form} onSubmit={handleDashboardClick}>
          <div className={styles.field}>
            <label className={styles.label}>E-mail address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className={styles.buttonText}>
              Forgot your password?
            </button>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.buttonLink}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

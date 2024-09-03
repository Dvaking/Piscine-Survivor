import styles from "./page.module.css";

export default function Login() {
  return (
    <main className={styles.LoginPage}>
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-offset-3 is-6">
              <h4 className="is-size-4">Login to your account</h4>

              <form>
                <div>
                  <label className="label">E-mail adresse</label>
                  <div className="control">
                    <input className="input" type="email" placeholder="Enter your email address"/>
                  </div>
                </div>

                <div>
                  <label className="label">Password</label>
                  <div className="control">
                    <input className="input" type="password" placeholder="Enter your Password"/>
                  </div>
                </div>

                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <label className="checkbox">
                        <input type="checkbox"/>
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="level-item">
                      <button className="button is-text">Forgot your password ?</button>
                    </div>
                  </div>
                </div>

                <div className="fiel is-grouped">
                  <div className="control">
                    <button className="button is-link">Sign In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

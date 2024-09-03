"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Tips() {
  const router = useRouter();

  const handleTipsClick = () => {
    router.push("/tips");
  };
  const handleStaticticsClick = () => {
    router.push("../dashboard/statistics");
  }
  const handleDashboardClick = () => {
    router.push("../dashboard");
  };
  return (
    <body>
      <main className={styles.tips}>
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
        <div className={styles.tipsContainer}>
          <h1 className={styles.title}>
            Tips for Coaches
          </h1>

          <div className={styles.tipsItems}>
            <div className="box">
              <h2>Help to choose the right clothes</h2>
              <p>
              Diam ultricies condimentum integer mi nascetur tempor dolor. Hendrerit dui mus metus, iaculis facilisi consectetur. Bibendum sem ipsum venenatis facilisi pharetra vel non. Ligula suscipit tempor molestie duis litora netus. Elit sagittis aliquam nibh massa; aliquam leo. Nullam per dictum at urna cubilia torquent varius bibendum. Per adipiscing dolor class nascetur magnis arcu cursus augue libero. Mus pulvinar turpis lacus malesuada aliquam felis auctor. Potenti nascetur nisi aliquet metus auctor est accumsan nisi. Commodo sed libero nullam venenatis primis ultrices.
              </p>
            </div>
            <div className="box">
              <h2>How to choose the right parfum?</h2>
              <p>
              Platea imperdiet nam odio posuere est nulla neque. Nec pellentesque tristique tempus felis vitae bibendum dolor maecenas. Posuere ante tincidunt ligula ut sit aliquam blandit. Apulvinar duis mollis, nullam turpis justo dui cras. Imperdiet eleifend condimentum ac interdum justo consectetur. Magna quis curabitur donec elit sem.
              </p>
            </div>
            <div className="box">
              <h2>Some dating app tips</h2>
              <p>
              Habitant egestas ligula magnis pretium tortor enim. Scelerisque ante blandit egestas bibendum a maecenas. Condimentum arcu consequat donec fringilla; dapibus vehicula. Aptent lacinia gravida iaculis quam erat quisque nibh mollis. Mollis ante conubia lobortis arcu vehicula. Per ornare habitasse magna adipiscing sagittis facilisis. Euismod proin facilisi montes primis natoque auctor consequat est. At iaculis imperdiet natoque facilisis venenatis. Potenti eget ac feugiat duis elit nibh nam.
              </p>
            </div>
            <div className="box">
              <h2>How to choose a good place for a date?</h2>
              <p>
              Convallis pretium pretium nascetur felis donec! Aliquet nisi torquent bibendum tristique tellus tincidunt bibendum magnis. Platea inceptos erat vestibulum integer porta; massa suscipit eros ultrices. Vitae malesuada natoque rhoncus gravida ad penatibus interdum. Amet felis suscipit leo lacus finibus. Felis congue congue himenaeos lectus pellentesque fusce commodo. Placerat sociosqu diam taciti dui aptent aptent aenean eros faucibus. Massa ex nulla elit vivamus massa; mauris porttitor sagittis.
              </p>
            </div>
            <div className="box">
              <h2>How to choose photos for a dating profile?</h2>
              <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Tortor nibh integer placerat vitae porttitor vitae. Sed cursus nullam suspendisse aliquet neque; elementum sagittis quam. Pharetra aliquet fermentum porttitor lacinia metus sem. Eu hendrerit montes conubia sem vulputate maecenas porta velit. Nam tristique massa class facilisi urna pellentesque non vivamus. Sociosqu a aptent sed torquent proin dis ligula mollis. Ultrices vulputate ligula sit turpis efficitur diam felis duis. Dui facilisi lacinia per blandit etiam.
              </p>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}

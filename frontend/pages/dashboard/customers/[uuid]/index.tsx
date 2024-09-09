import { useRouter } from "next/navigation";
import styles from "@styles/CustomersPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Customers() {
  const router = useRouter();

  return (
    <div className={`${styles.container} mt-6`}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Customers Details</h1>
        <button className={styles.backButton} onClick={() => router.back()}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>

      <div className={styles.container}>
        <div className="columns">
          <div className="column is-one-quarter">
            <div className="box">
              <figure className="image is-128x128 mx-auto">
                <img
                  className="is-rounded"
                  src="https://via.placeholder.com/128"
                  alt="Profile"
                />
              </figure>
              <div className="has-text-centered mt-3">
                <h3 className="title is-4">Francis Mitcham</h3>
                <div className="is-flex is-justify-content-center">
                  <span className="icon mr-2">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon">
                    <i className="fas fa-bookmark"></i>
                  </span>
                </div>
                <div className="mt-3">
                  <p>
                    Total Encounters: <strong>23</strong>
                  </p>
                  <p>
                    Positives: <strong>20</strong>
                  </p>
                  <p>
                    In Progress: <strong>3</strong>
                  </p>
                </div>
              </div>

              <hr />

              <div className="content">
                <p>
                  <strong>User ID:</strong> UD003054
                </p>
                <p>
                  <strong>Email:</strong> francis.mitcham@gmail.com
                </p>
                <p>
                  <strong>Address:</strong> 551 Swanston Street, Melbourne,
                  Victoria 3053 Australia
                </p>
                <p>
                  <strong>Last Activity:</strong> 15 Feb, 2024
                </p>
                <p>
                  <strong>Coach:</strong> Nicolas Latourne
                </p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <h3 className="title is-5">Recent Meetings</h3>
              <div className="box">
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Rating</th>
                      <th>Report</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>23 Jul, 2024</strong>
                      </td>
                      <td>⭐⭐⭐⭐⭐</td>
                      <td>A very good moment!</td>
                      <td>
                        <span className="tag is-warning">Dating App</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>21 Jul, 2024</strong>
                      </td>
                      <td>⭐⭐⭐</td>
                      <td>She was a very good person but not my type.</td>
                      <td>
                        <span className="tag is-success">Friends</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>19 Jun, 2024</strong>
                      </td>
                      <td>⭐</td>
                      <td>The meeting was not good, she was not interested.</td>
                      <td>
                        <span className="tag is-warning">Dating App</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>02 Jun, 2024</strong>
                      </td>
                      <td>⭐⭐⭐</td>
                      <td>Not bad, but not good.</td>
                      <td>
                        <span className="tag is-warning">Dating App</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12 May, 2024</strong>
                      </td>
                      <td>⭐⭐⭐⭐</td>
                      <td>Need to see her again, she was interesting.</td>
                      <td>
                        <span className="tag is-info">Social Network</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="title is-5">Payments History</h3>
              <div className="box mt-5">
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Payment Method</th>
                      <th>Amount</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>20 Jul, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>20 Jun, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>20 May, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>20 Apr, 2024</strong>
                      </td>
                      <td>
                        <i className="fas fa-credit-card"></i> VISA
                      </td>
                      <td>- $49.00</td>
                      <td>Monthly Subscription</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

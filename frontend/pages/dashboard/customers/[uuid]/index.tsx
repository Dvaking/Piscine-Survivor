import styles from "@styles/CustomersProfilePage.module.css";
import { useEffect, useState } from "react";
import { getCustomersProfileByUuid } from "@hooks";
import { GetCustomersProfileByUuidProps } from "@types";
import { useRouter } from "next/router";
import { headers } from "next/headers";
import { ProfileCard } from "@components";
import { GetCoachNameByUuid } from "@graphql";

export default function Customers() {
  const [customers, setCustomers] = useState<GetCustomersProfileByUuidProps>();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const customersUuid = router.query.uuid as string;

  useEffect(() => {
    if (!customersUuid) return;
    getCustomersProfileByUuid(customersUuid).then((data) =>
      setCustomers(data[0])
    );
    setIsLoaded(true);
  }, [customersUuid]);

  console.log(customers);

  return (
    <main>
      <div className={styles.headerBox}>
        <h1 className={styles.title}>Customers Details</h1>
      </div>
      <div className={styles.body}>
        <div className="pl-2">
          <ProfileCard customer={customers} />
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
    </main>
  );
}

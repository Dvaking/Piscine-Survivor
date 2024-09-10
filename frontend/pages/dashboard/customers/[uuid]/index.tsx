import styles from "@styles/CustomersProfilePage.module.css";
import { useEffect, useState } from "react";
import { getCustomersProfileByUuid } from "@hooks";
import { GetCustomersProfileByUuidProps } from "@types";
import { useRouter } from "next/router";
import { DateFormate, GenerateStarsRating, ProfileCard } from "@components";

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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main>
      <div className={`${styles.container} mt-6`}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>Customers Details</h1>
          <button className={styles.backButton} onClick={() => router.back()}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
        </div>

        <div className={styles.container}>
          <div className="columns">
            <ProfileCard customer={customers} />
            <div className="column">
              <div className="box">
                <h3 className="title is-5">Recent Meetings</h3>
                <div className="table-container">
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
                      {customers?.encounters.map((encounter) => (
                        <tr key={encounter.id}>
                          <td>
                            <strong>{DateFormate(encounter.date)}</strong>
                          </td>
                          <td>{GenerateStarsRating(encounter.rating)}</td>
                          <td>{encounter.comment}</td>
                          <td>
                            <span className="tag is-warning">
                              {encounter.source}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 className="title is-5">Payments History</h3>
                <div className="table-container">
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
    </main>
  );
}

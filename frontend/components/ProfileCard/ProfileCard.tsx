import styles from "./ProfileCard.module.css";
import { use, useEffect, useState } from "react";
import { GetCustomersProfileByUuidProps } from "@types";
import { getCoachNameByUuid } from "@hooks";

type ProfileCardProps = {
  customer?: GetCustomersProfileByUuidProps;
};

export function ProfileCard({ customer }: ProfileCardProps) {
  const [totalEncounters, setTotalEncounters] = useState(0);
  const [totalPositives, setTotalPositives] = useState(0);
  const [totalInProgress, setTotalInProgress] = useState(0);
  const [lastConnection, setLastConnection] = useState("No connection");
  const [coach, setCoach] = useState("Aucun coach");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!customer) return;
    setIsLoaded(true);
    setTotalEncounters(20);
    setTotalPositives(5);
    setTotalInProgress(3);
    if (customer.employee_uuid) {
      console.log(`Marde ${customer.employee_uuid}`);
      getCoachNameByUuid(customer.employee_uuid).then((data) =>
        setCoach(`${data[0].name} ${data[0].surname}`)
      );
    }
  }, [customer]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
        <div className={styles.box}>
          <div className={styles.header}>
            <figure className="image is-96x96 mx-auto">
              <img
                className="is-rounded"
                src={customer?.image ? customer.image : "https://via.placeholder.com/128"}
                alt="Profile"
              />
            </figure>
            <div className="has-text-centered mt-3">
              <h3 className="title is-4">
                {customer?.name} {customer?.surname}
              </h3>
            </div>
          </div>
          <hr />
          <div className={styles.ratio}>
            <div className={styles.ratioData}>
              <p>{totalEncounters}</p>
              <text>Total Encounters</text>
            </div>
            <div className={styles.ratioData}>
              <p>{totalPositives}</p>
              <text>Positives</text>
            </div>
            <div className={styles.ratioData}>
              <p>{totalInProgress}</p>
              <text>In Progress</text>
            </div>
          </div>
          <hr />
          <div className={styles.body}>
            <div>
              <text>SHORT DETAILS</text>
            </div>
            <div>
              <div>
                <text>User Id:</text>
                <p>{customer?.uuid}</p>
              </div>
              <div>
                <text>Email:</text>
                <p>{customer?.email}</p>
              </div>
              <div>
                <text>Address:</text>
                <p>{customer?.address}</p>
              </div>
              <div>
                <text>Last Activity:</text>
                <p>{lastConnection}</p>
              </div>
              <div>
                <text>Coach:</text>
                <p>{coach}</p>
              </div>
            </div>
          </div>
        </div>
  );
}

{
  /* <div className="content">
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
</div> */
}

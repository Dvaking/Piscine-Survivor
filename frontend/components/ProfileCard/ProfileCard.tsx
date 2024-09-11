import styles from "./ProfileCard.module.css";
import { use, useEffect, useState } from "react";
import { GetCustomersProfileByUuidProps } from "@types";
import { getCoachNameByUuid } from "@hooks";

type ProfileCardProps = {
  customer?: GetCustomersProfileByUuidProps;
};

export function ProfileCard({ customer }: ProfileCardProps) {
  const [customerData, setCustomerData] =
    useState<GetCustomersProfileByUuidProps>({
      uuid: "No UUID",
      email: "No Email",
      name: "No",
      surname: "Name",
      address: "No Adress",
      employee_uuid: "No Employee UUID",
      image: "No Image",
      encounters: [
        {
          id: 0,
          comment: "",
          date: "",
          rating: 0,
          source: "",
        },
      ],
      astrological_sign: "",
      birth_date: "",
      description: "",
      gender: "",
      phone_number: "No Phone Number",
      payments_history: [
        {
          amount: 0,
          comment: "",
          date: "",
          id: 0,
          payment_method: "",
        },
      ],
    });

  const [totalEncounters, setTotalEncounters] = useState(0);
  const [totalPositives, setTotalPositives] = useState(0);
  const [totalInProgress, setTotalInProgress] = useState(0);
  const [lastConnection, setLastConnection] = useState("No connection");
  const [coach, setCoach] = useState("Aucun coach");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!customer) return;
    setCustomerData(customer);
    setIsLoaded(true);
    setTotalEncounters(customerData.encounters.length);
    setTotalPositives(5);
    setTotalInProgress(3);
    if (customer.employee_uuid) {
      getCoachNameByUuid(customer.employee_uuid).then((data) =>
        setCoach(`${data[0].name} ${data[0].surname}`)
      );
    }
  }, [customer]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="column is-one-quarter">
      <div className="box">
        <figure className="image is-128x128 mx-auto">
          <img
            className="is-rounded"
            src={customerData.image ? "data:image/png;base64,"+customerData.image : "https://via.placeholder.com/128"}
            alt="Profile"
          />
        </figure>
        <div className="has-text-centered mt-3">
          <h3 className="title is-4">
            {customerData.name} {customerData.surname}
          </h3>
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
    </div>
  );
}

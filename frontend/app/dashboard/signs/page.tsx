"use client";

import { useEffect, useState } from "react";
import { getCustomersInformation } from "@components";
import { GetCustomersInformationProps } from "@types";
import styles from "./page.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../../Components/Navbar/Navbar";

export default function Home() {
  const [customers, setCustomers] = useState<GetCustomersInformationProps[]>(
    []
  );
  const [selectedClient1, setSelectedClient1] =
    useState<GetCustomersInformationProps | null>(null);
  const [selectedClient2, setSelectedClient2] =
    useState<GetCustomersInformationProps | null>(null);
  const [dropdownForClient1, setDropdownForClient1] = useState(false);
  const [dropdownForClient2, setDropdownForClient2] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  // Fetch customers data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomers = await getCustomersInformation();
      setCustomers(fetchedCustomers);
    };
    fetchData();
  }, []);

  const handleClient1Click = () => {
    setDropdownForClient1(!dropdownForClient1);
    setDropdownForClient2(false);
  };

  const handleClient2Click = () => {
    setDropdownForClient2(!dropdownForClient2);
    setDropdownForClient1(false);
  };

  const selectClient1 = (client: GetCustomersInformationProps) => {
    setSelectedClient1(client);
    setDropdownForClient1(false);
  };

  const selectClient2 = (client: GetCustomersInformationProps) => {
    setSelectedClient2(client);
    setDropdownForClient2(false);
  };

  // Handle button click for generating a random percentage
  const handleButtonClick = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setResult(randomNumber);
  };

  const isButtonDisabled = !selectedClient1 || !selectedClient2;

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.heading}>
        <div className={styles.title}>
          <h1>
            Astrological Sign Compatibility <i className="far fa-star"></i>
          </h1>
          <p>Check if you're a match</p>
        </div>
      </div>
      <div className={styles.containerBg}>
        <div className={styles.container}>
          <div className={styles.boxWrapper}>
            <div
              className={
                selectedClient1
                  ? styles.clientBoxSelected
                  : styles.clientBoxNotSelected
              }
              onClick={handleClient1Click}
            >
              {selectedClient1 ? (
                <>
                  <figure className="image">
                    <img
                      className="is-rounded"
                      src="https://bulma.io/assets/images/placeholders/128x128.png"
                      alt="Client"
                    />
                  </figure>
                  <div className={styles.clientInfo}>
                    <h2>{selectedClient1.name}</h2>
                    <p>{selectedClient1.astrological_sign}</p>
                  </div>
                </>
              ) : (
                <p>Select Client...</p>
              )}
            </div>
            {dropdownForClient1 && (
              <div className={styles.dropdown}>
                <ul>
                  {customers
                    .filter((client) => client.id !== selectedClient2?.id)
                    .map((client) => (
                      <li
                        key={client.id}
                        className={styles.listItem}
                        onClick={() => selectClient1(client)}
                      >
                        {client.name} ({client.astrological_sign})
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <div
              className={
                result ? styles.resultsBoxActive : styles.resultsBoxInactive
              }
            >
              {result !== null ? (
                <>
                  <p>
                    <strong>{result}%</strong>
                  </p>
                  <p>Compatible</p>
                </>
              ) : (
                <p>
                  Astrological Sign
                  <br />
                  Compatibility Tester
                </p>
              )}
            </div>
            <div
              className={
                selectedClient2
                  ? styles.clientBoxSelected
                  : styles.clientBoxNotSelected
              }
              onClick={handleClient2Click}
            >
              {selectedClient2 ? (
                <>
                  <figure className="image">
                    <img
                      className="is-rounded"
                      src="https://bulma.io/assets/images/placeholders/128x128.png"
                      alt="Client"
                    />
                  </figure>
                  <div className={styles.clientInfo}>
                    <h2>{selectedClient2.name}</h2>
                    <p>{selectedClient2.astrological_sign}</p>
                  </div>
                </>
              ) : (
                <p>Select Client...</p>
              )}
            </div>
            {dropdownForClient2 && (
              <div className={styles.dropdown}>
                <ul>
                  {customers
                    .filter((client) => client.id !== selectedClient1?.id)
                    .map((client) => (
                      <li
                        key={client.id}
                        className={styles.listItem}
                        onClick={() => selectClient2(client)}
                      >
                        {client.name} ({client.astrological_sign})
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className="button is-link is-medium"
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

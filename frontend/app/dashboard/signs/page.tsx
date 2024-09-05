"use client";

import { useEffect, useRef } from "react";
import React, { useState } from "react";
import styles from "./page.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../../Components/Navbar/Navbar";

// async function fetchCompatibility(sign1: string, sign2: string) {
//   const userId = '<Your User Id>';
//   const apiKey = 'e6e70c63639f039518f84a0f3c517837';
//   const language = 'en';
//   const data = {
//     zodiac_sign1: sign1,
//     zodiac_sign2: sign2
//   };
// }

export default function Home() {
  const [selectedClient1, setSelectedClient1] = useState<{
    name: string;
    sign: string;
  } | null>(null);
  const [selectedClient2, setSelectedClient2] = useState<{
    name: string;
    sign: string;
  } | null>(null);
  const [dropdownForClient1, setDropdownForClient1] = useState(false);
  const [dropdownForClient2, setDropdownForClient2] = useState(false);
  const clients = [
    { name: "Diana White", sign: "Aries" },
    { name: "Charlie Brown", sign: "Taurus" },
  ];
  const handleClient1Click = () => {
    setDropdownForClient1(!dropdownForClient1);
    setDropdownForClient2(false);
  };
  const handleClient2Click = () => {
    setDropdownForClient2(!dropdownForClient2);
    setDropdownForClient1(false);
  };
  const selectClient1 = (client: { name: string; sign: string }) => {
    setSelectedClient1(client);
    setDropdownForClient1(false);
  };
  const selectClient2 = (client: { name: string; sign: string }) => {
    setSelectedClient2(client);
    setDropdownForClient2(false);
  };

  const [result, setResult] = useState<number | null>(null);
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
            Astrological Sign Compatibility<i className="far fa-star"></i>
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
                    />
                  </figure>
                  <div className={styles.clientInfo}>
                    <h2>{selectedClient1.name}</h2>
                    <p>{selectedClient1.sign}</p>
                  </div>
                </>
              ) : (
                <p>Select Client...</p>
              )}
            </div>
            {dropdownForClient1 && (
              <div className={styles.dropdown}>
                <ul>
                  {clients
                    .filter((client) => client.name !== selectedClient2?.name)
                    .map((client, index) => (
                      <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => selectClient1(client)}
                      >
                        {client.name} ({client.sign})
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <div className={
                result
                  ? styles.resultsBoxActive
                  : styles.resultsBoxInactive
              }>
              {result !== null ? (
                <>
                  <p><strong>{result}%</strong></p>
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
                    />
                  </figure>
                  <div className={styles.clientInfo}>
                    <h2>{selectedClient2.name}</h2>
                    <p>{selectedClient2.sign}</p>
                  </div>
                </>
              ) : (
                <p>Select Client...</p>
              )}
            </div>
            {dropdownForClient2 && (
              <div className={styles.dropdown}>
                <ul>
                  {clients
                    .filter((client) => client.name !== selectedClient1?.name)
                    .map((client, index) => (
                      <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => selectClient2(client)}
                      >
                        {client.name} ({client.sign})
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

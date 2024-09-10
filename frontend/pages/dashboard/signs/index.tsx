import { useEffect, useState } from "react";
import { getCustomers } from "@hooks";
import { GetCustomersProps } from "@types";
import styles from '@styles/Signspage.module.css';
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const [customers, setCustomers] = useState<GetCustomersProps[]>([]);
  const [selectedClient1, setSelectedClient1] =
    useState<GetCustomersProps | null>(null);
  const [selectedClient2, setSelectedClient2] =
    useState<GetCustomersProps | null>(null);
  const [searchQuery1, setSearchQuery1] = useState<string>("");
  const [searchQuery2, setSearchQuery2] = useState<string>("");
  const [dropdownForClient1, setDropdownForClient1] = useState(false);
  const [dropdownForClient2, setDropdownForClient2] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomers = await getCustomers();
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

  const selectClient1 = (client: GetCustomersProps) => {
    setSelectedClient1(client);
    setDropdownForClient1(false);
    console.log(client); //////////////////////////////////////////////////////
  };

  const selectClient2 = (client: GetCustomersProps) => {
    setSelectedClient2(client);
    setDropdownForClient2(false);
  };

  const isButtonDisabled = !selectedClient1 || !selectedClient2;

  const compatibilityData: {
    [key: string]: number;
  } = {
    "Aries-Aries": 50,
    "Aries-Taurus": 38,
    "Aries-Gemini": 83,
    "Aries-Cancer": 42,
    "Aries-Leo": 97,
    "Aries-Virgo": 63,
    "Aries-Libra": 85,
    "Aries-Scorpio": 50,
    "Aries-Sagittarius": 93,
    "Aries-Capricorn": 47,
    "Aries-Aquarius": 78,
    "Aries-Pisces": 67,
    "Taurus-Taurus": 65,
    "Taurus-Gemini": 33,
    "Taurus-Cancer": 97,
    "Taurus-Leo": 73,
    "Taurus-Virgo": 90,
    "Taurus-Libra": 65,
    "Taurus-Scorpio": 88,
    "Taurus-Sagittarius": 30,
    "Taurus-Capricorn": 98,
    "Taurus-Aquarius": 58,
    "Taurus-Pisces": 85,
    "Gemini-Gemini": 60,
    "Gemini-Cancer": 65,
    "Gemini-Leo": 88,
    "Gemini-Virgo": 68,
    "Gemini-Libra": 93,
    "Gemini-Scorpio": 28,
    "Gemini-Sagittarius": 60,
    "Gemini-Capricorn": 68,
    "Gemini-Aquarius": 85,
    "Gemini-Pisces": 53,
    "Cancer-Cancer": 75,
    "Cancer-Leo": 35,
    "Cancer-Virgo": 90,
    "Cancer-Libra": 43,
    "Cancer-Scorpio": 94,
    "Cancer-Sagittarius": 53,
    "Cancer-Capricorn": 83,
    "Cancer-Aquarius": 27,
    "Cancer-Pisces": 98,
    "Leo-Leo": 45,
    "Leo-Virgo": 35,
    "Leo-Libra": 97,
    "Leo-Scorpio": 58,
    "Leo-Sagittarius": 93,
    "Leo-Capricorn": 35,
    "Leo-Aquarius": 68,
    "Leo-Pisces": 38,
    "Virgo-Virgo": 65,
    "Virgo-Libra": 68,
    "Virgo-Scorpio": 88,
    "Virgo-Sagittarius": 48,
    "Virgo-Capricorn": 95,
    "Virgo-Aquarius": 30,
    "Virgo-Pisces": 88,
    "Libra-Libra": 75,
    "Libra-Scorpio": 35,
    "Libra-Sagittarius": 73,
    "Libra-Capricorn": 55,
    "Libra-Aquarius": 90,
    "Libra-Pisces": 88,
    "Scorpio-Scorpio": 80,
    "Scorpio-Sagittarius": 28,
    "Scorpio-Capricorn": 95,
    "Scorpio-Aquarius": 73,
    "Scorpio-Pisces": 97,
    "Sagittarius-Sagittarius": 45,
    "Sagittarius-Capricorn": 60,
    "Sagittarius-Aquarius": 90,
    "Sagittarius-Pisces": 63,
    "Capricorn-Capricorn": 75,
    "Capricorn-Aquarius": 68,
    "Capricorn-Pisces": 88,
    "Aquarius-Aquarius": 45,
    "Aquarius-Pisces": 45,
    "Pisces-Pisces": 60,
  };

  const calculateCompatibility = () => {
    if (selectedClient1 && selectedClient2) {
      const key = `${selectedClient1.astrological_sign}-${selectedClient2.astrological_sign}`;
      const reverseKey = `${selectedClient2.astrological_sign}-${selectedClient1.astrological_sign}`;
      const percentage =
        compatibilityData[key] || compatibilityData[reverseKey] || 0;
      setResult(percentage);
    }
  };

  const handleSearchChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery1(e.target.value.toLowerCase());
  };

  const handleSearchChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery2(e.target.value.toLowerCase());
  };

  const filteredClients1 = customers.filter((client) =>
    client.name.toLowerCase().includes(searchQuery1)
  );

  const filteredClients2 = customers.filter((client) =>
    client.name.toLowerCase().includes(searchQuery2)
  );

  return (
    <main className={styles.main}>
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
                      src={selectedClient1.image}
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
              <div className={styles.dropdown1}>
                <input
                  type="text"
                  placeholder="Search Clients..."
                  className={styles.searchInput}
                  onChange={handleSearchChange1}
                />
                <ul>
                  {filteredClients1
                    .filter((client) => client.name !== selectedClient2?.name)
                    .map((client, index) => (
                      <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => selectClient1(client)}
                      >
                        {client.name} {client.surname}
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
                      src={selectedClient2.image}
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
              <div className={styles.dropdown2}>
                <input
                  type="text"
                  placeholder="Search Clients..."
                  className={styles.searchInput}
                  onChange={handleSearchChange2}
                />
                <ul>
                  {filteredClients2
                    .filter((client) => client.name !== selectedClient1?.name)
                    .map((client, index) => (
                      <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => selectClient2(client)}
                      >
                        {client.name} {client.surname}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className="button is-link is-medium"
              onClick={calculateCompatibility}
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

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCustomers, getClothesByCustomerUuid } from "@hooks";
import { GetCustomersProps, GetClothesProps } from "@types";
import styles from "@styles/ClothesPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";

type ClientWithClothes = {
  client: GetCustomersProps;
  clothes: GetClothesProps[];
};

export default function Home() {
  const router = useRouter();
  const [clothesData, setClothesData] = useState<ClientWithClothes[]>([]);
  const [customers, setCustomers] = useState<GetCustomersProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) router.push("/login");
    const fetchData = async () => {
      const fetchedCustomers = await getCustomers();
      const fetchedClothesData = await fetchAllClothesData(fetchedCustomers);
      setCustomers(fetchedCustomers);
      setClothesData(fetchedClothesData);
    };
    fetchData();
  }, []);

  const fetchAllClothesData = async (customers: GetCustomersProps[]) => {
    const clothesData = await Promise.all(
      customers.map(async (client) => {
        const clothes = await getClothesByCustomerUuid(client.uuid);
        return { client, clothes };
      })
    );
    return clothesData;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredClients = customers.filter((client) =>
    client.name.toLowerCase().includes(searchQuery)
  );

  const filteredClientsWithClothes = clothesData
    .filter(({ clothes }) => clothes.length > 0)
    .map(({ client }) => client);

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <div className={styles.title}>
          <h1>Customers Clothing</h1>
          <p>Build an outfit</p>
        </div>
      </div>
      <div className={styles.containerBg}>
        <div className={styles.container}>
          <div className={styles.chooseClientBox}>
            <h2>Select a customer to view their wardrobe</h2>
            <input
              type="text"
              placeholder="Search for a customer"
              className={styles.searchInput}
              onChange={handleSearchChange}
            />
            <div className={styles.clientListWrapper}>
              <ul className={styles.clientList}>
                {filteredClientsWithClothes.map((client) => (
                  <li key={client.uuid} className={styles.listItem}>
                    <Link href={`/dashboard/clothes/${client.uuid}`}>
                      <div className={styles.ppName}>
                        <div>
                          <img
                            src={
                              client.image
                                ? `data:image/png;base64,${client.image}`
                                : "https://via.placeholder.com/128"
                            }
                            alt={client.name}
                            className={styles.avatar}
                          />
                        </div>
                        <h3>
                          {client.name} {client.surname}
                        </h3>
                        <p>{client.email}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

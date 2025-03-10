import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCustomers, getPaymentMethodByUuid } from "@hooks";
import { GetCustomersProps } from "@types";
import styles from "@styles/CustomersSearchPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [customers, setCustomers] = useState<GetCustomersProps[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<{
    [key: string]: string;
  }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownForClient, setDropdownForClient] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [emailError, setEmailError] = useState<string>("");

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
    const fetchData = async () => {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);

      fetchedCustomers.forEach(async (customer) => {
        const paymentMethodData = await getPaymentMethodByUuid(customer.uuid);
        const paymentMethod =
          paymentMethodData?.private_payments_history?.[0]?.payment_method ||
          "No payment method found";
        setPaymentMethods((prevMethods) => ({
          ...prevMethods,
          [customer.uuid]: paymentMethod,
        }));
      });
    };
    fetchData();
  }, []);

  const getPaymentMethodImage = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "Bank Transfer":
        return "https://img.icons8.com/?size=100&id=woHAoqQoqxX1&format=png&color=000000";
      case "Credit Card":
        return "https://img.icons8.com/?size=100&id=pFNd0FTuBU2Q&format=png&color=000000";
      case "PayPal":
        return "https://img.icons8.com/?size=100&id=70557&format=png&color=000000";
      default:
        return "https://img.icons8.com/?size=100&id=kMV_RnIVubYa&format=png&color=000000";
    }
  };

  // const generateUniqueId = () => {
  //   let randomId;
  //   const existingIds = employees.map((employee) => employee.id);
  //   do {
  //     randomId = Math.floor(Math.random() * 10000);
  //   } while (existingIds.includes(randomId));
  //   return randomId;
  // };

  // const [formData, setFormData] = useState<InsertEmployeeProps>({
  //   name: "",
  //   surname: "",
  //   gender: "",
  //   birth_date: "",
  //   email: "",
  //   work: "",
  //   id: generateUniqueId(),
  // });

  // const isEmailInUse = (email: string) => {
  //   return employees.some((employee) => employee.email === email);
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name === "email") {
  //     if (isEmailInUse(value)) {
  //       setEmailError("Email already in use");
  //     } else {
  //       setEmailError("");
  //     }
  //   }
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: name === "id" ? Number(value) : value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await insertEmployee(formData);
  //     setPopupVisible(false);
  //     router.reload();
  //   } catch (error) {
  //     console.error("Failed to insert employee:", error);
  //   }
  // };

  // const handleActionClick = (employee: GetEmployeesProps) => {
  //   if (employee.work !== "Coach" && employee.work !== "coach") {
  //     alert("Clients can only be assigned to coaches.");
  //     return;
  //   }
  //   if (selectedEmployee && selectedEmployee.uuid === employee.uuid) {
  //     setDropdownForClient(!dropdownForClient);
  //   } else {
  //     setSelectedEmployee(employee);
  //     setDropdownForClient(true);
  //   }
  // };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value.toLowerCase());
  // };

  // const filteredClients = customers.filter((client) =>
  //   client.name.toLowerCase().includes(searchQuery)
  // );
  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <div className={styles.title}>
          <h1>Customers List</h1>
          <p>You have total {customers.length} customers</p>
        </div>
        <div className={styles.exportAddButtons}>
          <div>
            <button className="button is-medium">Export</button>
          </div>
          <div>
            <button
              className="button is-link is-large"
              onClick={() => setPopupVisible(true)}
            >
              <i className="fas fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      {/* {isPopupVisible && (
        <div
          className={styles.popupOverlay}
          onClick={() => setPopupVisible(true)}
        >
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}>
            <h2>New Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Surname</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Gender</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    placeholder="Enter your gender"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Date of Birth</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    placeholder="Enter your date of birth (ex: 1990-01-01)"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div>
                {emailError && <p className="help is-danger">{emailError}</p>}
              </div>
              <div className="field">
                <label className="label">Job</label>
                <div className="control">
                  <input
                    className="input"
                    type="work"
                    name="work"
                    value={formData.work}
                    onChange={handleInputChange}
                    placeholder="Enter your job type (ex: coach)"
                  />
                </div>
              </div>
              <div className="field">
                <div className={styles.formButtons}>
                  <div>
                    <button
                      className="button is-link"
                      type="submit"
                      disabled={!!emailError}
                    >
                      Save
                    </button>
                  </div>
                  <div>
                    <button
                      className="button"
                      onClick={() => setPopupVisible(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )} */}
      <div className={styles.containerBg}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <div className={styles.dropApply}>
              <div className="dropdown">
                <button className="button">
                  <div>Bulk Action</div>
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </button>
              </div>
              <div>
                <div className="button is-static">Apply</div>
              </div>
            </div>
            <div className={styles.icons}>
              <i className="fas fa-search" aria-hidden="true"></i>
              <i className="fas fa-sort-amount-down" aria-hidden="true"></i>
              <i className="fas fa-cog" aria-hidden="true"></i>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <div className={`table-container ${styles.tableContainer}`}>
                <table
                  className={`table is-fullwidth is-striped ${styles.table}`}
                >
                  <thead>
                    <tr>
                      <th>Customers</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Payment Method</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <div className={styles.clientProfileButton}>
                          <i className="far fa-square"></i>
                          <img
                            src={
                              customer.image
                                ? `data:image/png;base64,${customer.image}`
                                : "https://via.placeholder.com/128"
                            }
                            alt={customer.name}
                            className={styles.profilePicture}
                          />
                          <Link href={`/dashboard/customers/${customer.uuid}`}>
                            <p>
                              {customer.name} {customer.surname}
                            </p>
                          </Link>
                          </div>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.phone_number}</td>
                        <td className={styles.paymentMethod}>
                          <div className={styles.paymentImageContainer}>
                            <img
                              src={getPaymentMethodImage(
                                paymentMethods[customer.uuid]
                              )}
                              alt="Payment Method"
                              className={styles.paymentImage}
                            />
                            <div className={styles.paymentTooltip}>
                              {paymentMethods[customer.uuid] || "Loading..."}
                            </div>
                          </div>
                        </td>
                        <td>
                          <Link
                            href={`/dashboard/clothes/${customer.uuid}`}
                            className={styles.actionLink}
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import {
  getCustomers,
  getEmployees,
  updateCustomerEmployee,
  insertEmployee,
  registerUser,
} from "@hooks";
import {
  GetCustomersProps,
  GetEmployeesProps,
  InsertEmployeeProps,
} from "@types";
import styles from "@styles/EmployeesPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [employees, setEmployees] = useState<GetEmployeesProps[]>([]);
  const [customers, setCustomers] = useState<GetCustomersProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] =
    useState<GetEmployeesProps | null>(null);
  const [dropdownForClient, setDropdownForClient] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [emailError, setEmailError] = useState<string>("");

  const generateUniqueId = () => {
    let randomId;
    const existingIds = employees.map((employee) => employee.id);
    do {
      randomId = Math.floor(Math.random() * 10000);
    } while (existingIds.includes(randomId));
    return randomId;
  };

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    gender: "",
    birth_date: "",
    email: "",
    work: "",
    id: 0,
    password: "",
  });

  const isEmailInUse = (email: string) => {
    return employees.some((employee) => employee.email === email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (isEmailInUse(value)) {
        setEmailError("Email already in use");
      } else {
        setEmailError("");
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      id: generateUniqueId(),
    }));
    try {
      const response = await insertEmployee({
        email: formData.email,
        work: formData.work,
        name: formData.name,
        surname: formData.surname,
        birth_date: formData.birth_date,
        gender: formData.gender,
        id: formData.id,
      });
      if (response)
        await registerUser(
          response.email,
          formData.password,
          response.work,
          response.uuid
        );
      setPopupVisible(false);
      // router.reload();
    } catch (error) {
      console.error("Failed to insert employee:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
    const fetchData = async () => {
      const fetchedEmployees = await getEmployees();
      const fetchedCustomers = await getCustomers();
      setEmployees(fetchedEmployees);
      setCustomers(fetchedCustomers);
    };
    fetchData();
  }, []);

  const handleActionClick = (employee: GetEmployeesProps) => {
    if (employee.work !== "Coach" && employee.work !== "coach") {
      alert("Clients can only be assigned to coaches.");
      return;
    }
    if (selectedEmployee && selectedEmployee.uuid === employee.uuid) {
      setDropdownForClient(!dropdownForClient);
    } else {
      setSelectedEmployee(employee);
      setDropdownForClient(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredClients = customers.filter((client) =>
    client.name.toLowerCase().includes(searchQuery)
  );

  const assignClient = async (client: GetCustomersProps) => {
    try {
      await updateCustomerEmployee(client.uuid, selectedEmployee?.uuid ?? "");
      setDropdownForClient(false);
      setSelectedEmployee(null);
      router.reload();
    } catch (error) {
      console.error("Failed to assign client:", error);
    }
  };

  const getEmployeeCustomerNumber = (employee: GetEmployeesProps) => {
    const assignedClients = customers.filter((client) => {
      return client.employee_uuid === employee.uuid;
    });
    return assignedClients.length;
  };
  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <div className={styles.title}>
          <h1>Employee List</h1>
          <p>You have {employees.length} employees</p>
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
      {isPopupVisible && (
        <div
          className={styles.popupOverlay}
          onClick={() => setPopupVisible(true)}
        >
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
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
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                </div>
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
      )}
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
          <div className={styles.category}>
            <div className={styles.checkName}>
              <i className="far fa-square"></i>
              Employee
            </div>
            <div>Email</div>
            <div>Phone</div>
            <div>Number of Customers</div>
            <div className={styles.actions}>Actions</div>
          </div>
          {employees.map((employee) => (
            <div className={styles.employee} key={employee.uuid}>
              <div className={styles.checkName}>
                <i className="far fa-square"></i>
                <img
                  src={
                    employee.image
                      ? `data:image/png;base64,${employee.image}`
                      : "https://via.placeholder.com/128"
                  }
                  alt={employee.name}
                  className={styles.profilePicture}
                />
                <p>
                  <strong>
                    {employee.name} {employee.surname}
                  </strong>
                </p>
              </div>
              <div className={styles.email}>{employee.email}</div>
              <div>---</div>
              <div>{getEmployeeCustomerNumber(employee)}</div>

              <div
                className={styles.actions}
                onClick={() => handleActionClick(employee)}
              >
                <i className="fas fa-ellipsis-h"></i>
              </div>

              {dropdownForClient && (
                <div className={styles.dropdown}>
                  <div className={styles.topDropdown}>
                    <h2> Assign Customer To Coach </h2>
                    <i
                      className="fas fa-x"
                      onClick={() => setDropdownForClient(false)}
                    ></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Customers..."
                    className={styles.searchInput}
                    onChange={handleSearchChange}
                  />
                  <ul>
                    {filteredClients
                      .filter((client) => client.employee_uuid === null)
                      .map((client) => (
                        <li
                          key={client.uuid}
                          className={styles.listItem}
                          onClick={() => assignClient(client)}
                        >
                          <p>
                            {client.name} {client.surname}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

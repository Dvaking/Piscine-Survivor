import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  getCustomers,
  getEmployees,
  updateCustomerEmployee,
  insertEmployee,
} from "@hooks";
import {
  GetCustomersProps,
  GetEmployeesProps,
  InsertEmployeeProps,
} from "@types";
import styles from "@styles/EmployeesPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const router = useRouter();
  const [employees, setEmployees] = useState<GetEmployeesProps[]>([]);
  const [customers, setCustomers] = useState<GetCustomersProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] =
    useState<GetEmployeesProps | null>(null);
  const [dropdownForClient, setDropdownForClient] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState<InsertEmployeeProps>({
    name: "",
    surname: "",
    gender: "",
    birth_date: "",
    email: "",
    work: "",
    id: employees.length + 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await insertEmployee(formData);
      setPopupVisible(false);
      router.reload();
    } catch (error) {
      console.error("Failed to insert employee:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEmployees = await getEmployees();
      const fetchedCustomers = await getCustomers();
      setEmployees(fetchedEmployees);
      setCustomers(fetchedCustomers);
    };
    fetchData();
  }, []);

  const handleActionClick = (employee: GetEmployeesProps) => {
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
            <button className="button is-link is-large" onClick={() => setPopupVisible(true)}>
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
            <form>
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
              </div>
              <div className="field">
                <label className="label">Job</label>
                <div className="control">
                  <input
                    className="input"
                    type="job"
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
                    <button className="button is-link" type="submit">
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
                <div className="dropdown-trigger">
                  <button className="button">
                    <span>Bulk Action</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
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
            {/* <div>Position</div> */}
            <div>Number of Customers</div>
            <div>
              <p className={styles.actions}>Actions</p>
            </div>
          </div>
          {employees.map((employee) => (
            <div className={styles.employee} key={employee.uuid}>
              <div className={styles.checkName}>
                <i className="far fa-square"></i>
                <p>
                  <strong>
                    {employee.name} {employee.surname}
                  </strong>
                </p>
              </div>
              <div>{employee.email}</div>
              <div>---</div>
              {/* <div>{employee.work}</div> */}
              <div>{getEmployeeCustomerNumber(employee)}</div>
              <div className={styles.addClientButton}>
                <div
                  className={styles.actions}
                  onClick={() => handleActionClick(employee)}
                >
                  <i className="fas fa-ellipsis-h"></i>
                </div>
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

import { useEffect, useState, useRef } from "react";
import { getCustomers, getEmployees, updateCustomerAssign } from "@hooks";
import { GetCustomersProps, GetEmployeesProps } from "@types";
import styles from '@styles/CoachesPage.module.css'
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const [employees, setEmployees] = useState<GetEmployeesProps[]>([]);
  const [customers, setCustomers] = useState<GetCustomersProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownForClient, setDropdownForClient] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEmployees = await getEmployees();
      console.log(fetchedEmployees); //////////////////////////////////////////////////////////////
      const fetchedCustomers = await getCustomers();
      setEmployees(fetchedEmployees);
      setCustomers(fetchedCustomers);
    };
    fetchData();
  }, []);

  const handleActionClick = () => {
    setDropdownForClient(!dropdownForClient);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredClients = customers.filter((client) =>
    client.name.toLowerCase().includes(searchQuery)
  );

  const assignClient = (employee : GetEmployeesProps, client : GetCustomersProps) => {
    setDropdownForClient(false);
    updateCustomerAssign(employee.uuid, client.uuid);
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
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
            <button className="button is-link is-large" onClick={togglePopup}>
              <i className="fas fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
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
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    className="input"
                    type="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Job</label>
                <div className="control">
                  <input
                    className="input"
                    type="job"
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
                      type="button"
                      onClick={togglePopup}
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
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <div className="dropdown-item">Insert here</div>
                    <hr className="dropdown-divider" />
                    <div className="dropdown-item">Insert here</div>
                  </div>
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
            <div>Number of Customers</div>
            <div>
              <p className={styles.actions}>Actions</p>
            </div>
          </div>
          {employees.map((employee, index) => (
            <div className={styles.employee} key={employee.uuid}>
              <div className={styles.checkName}>
                <i className="far fa-square"></i>
                <p>
                  <strong>{employee.name} {employee.surname}</strong>
                </p>
              </div>
              <div>{employee.email}</div>
              <div>---</div>
              <div>{employee.customer_asing.length}</div>
              <div className={styles.addClientButton}>
                <div className={styles.actions} onClick={handleActionClick}>
                  <i className="fas fa-ellipsis-h"></i>
                </div>
              </div>
              {dropdownForClient && (
                <div className={styles.dropdown}>
                  <div> Assign Customer </div>
                  <input
                    type="text"
                    placeholder="Search Clients..."
                    className={styles.searchInput}
                    onChange={handleSearchChange}
                  />
                  <ul>
                    {filteredClients
                      .filter((client) => client.employee_uuid === null)
                      .map((client, index) => (
                        <li
                          key={index}
                          className={styles.listItem}
                          onClick={() => assignClient(employee, client)}
                        >
                          {client.name} {client.surname}
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

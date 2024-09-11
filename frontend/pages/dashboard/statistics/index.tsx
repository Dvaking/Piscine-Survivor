import { useEffect, useState, useRef } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import styles from "@styles/StatisticsPage.module.css";
import { getEmployeesByWork, getEmployeesAssignedCustomers } from "@hooks";
import {
  GetEmployeesByWorkProps,
  GetEmployeesAssignedCustomersProps,
} from "@types";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StaticticsGraph: React.FC = () => {
  const [employeesData, setEmployeesData] = useState<GetEmployeesByWorkProps[]>(
    []
  );
  const [assignedCustomersData, setAssignedCustomersData] = useState<
    GetEmployeesAssignedCustomersProps[]
  >([]);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);

  const fetchEmployeesData = async () => {
    try {
      const data = await getEmployeesByWork();
      const mappedData: GetEmployeesByWorkProps[] = data.map((item) => ({
        name: item.name,
        image:
          "image" in item && typeof item.image === "string"
            ? item.image
            : undefined,
        email:
          "email" in item && typeof item.email === "string"
            ? item.email
            : undefined,
        events:
          "events" in item && Array.isArray(item.events) ? item.events : [],
      }));

      setEmployeesData(mappedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const fetchAssignedCustomersData = async () => {
    try {
      const data = await getEmployeesAssignedCustomers();

      console.log("Données des clients assignés : ", data);

      const mappedCustomersData: GetEmployeesAssignedCustomersProps[] =
        data.map((item) => ({
          name: item.name,
          customers_assign: item.customers_assign || [],
        }));

      setAssignedCustomersData(mappedCustomersData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données des clients assignés",
        error
      );
    }
  };

  useEffect(() => {
    fetchEmployeesData();
    fetchAssignedCustomersData();
  }, []);

  const lineChartData = {
    labels: employeesData.map((employee) => employee.name),
    datasets: [
      {
        label: "Number of Events",
        data: employeesData.map((employee) => employee.events?.length ?? 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const backgroundColors = assignedCustomersData.map(() => getRandomColor());

  const pieChartData = {
    labels: assignedCustomersData.map((employee) => employee.name),
    datasets: [
      {
        label: "Customers Distribution",
        data: assignedCustomersData.map(
          (employee) => employee.customers_assign?.length ?? 0
        ),
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Coaches Statistics",
      },
    },
  };

  return (
    <main className="has-background-white-smoke">
      <div className="columns is-multiline">
        <div className="column is-half-desktop is-full-mobile">
          <div className="box is-shadowless has-background-white mb-6 ml-4 mr-4 mt-4">
            <div className="field">
              <div
                className={styles["chart-container"]}
                style={{ height: "37rem" }}
              >
                <Line ref={chartRef} data={lineChartData} options={options} />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-half-desktop is-full-mobile">
          <div className="box is-shadowless has-background-white mb-6 ml-4 mr-4 mt-4">
            <div className="field">
              <div
                className={styles["chart-container"]}
                style={{ height: "37rem" }}
              >
                <Pie ref={pieChartRef} data={pieChartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StaticticsGraph;

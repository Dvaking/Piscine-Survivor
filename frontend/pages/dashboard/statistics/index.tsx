import React, { useEffect, useState, useRef } from "react";
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
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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

const StatisticsGraph: React.FC = () => {
  const [employeesData, setEmployeesData] = useState<GetEmployeesByWorkProps[]>(
    []
  );
  const [assignedCustomersData, setAssignedCustomersData] = useState<
    GetEmployeesAssignedCustomersProps[]
  >([]);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
    (async () => {
      try {
        const data = await getEmployeesByWork();
        const mappedData = data.map((item: any) => ({
          name: item.name,
          image: typeof item.image === "string" ? item.image : undefined,
          email: typeof item.email === "string" ? item.email : undefined,
          events: Array.isArray(item.events) ? item.events : [],
        }));
        setEmployeesData(mappedData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des employés :",
          error
        );
      }
    })();

    (async () => {
      try {
        const data = await getEmployeesAssignedCustomers();
        const mappedCustomersData = data.map((item: any) => ({
          name: item.name,
          customers_assign: item.customer_assign || [],
        }));
        setAssignedCustomersData(mappedCustomersData);
        console.log(mappedCustomersData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des clients assignés :",
          error
        );
      }
    })();
  }, []);

  const lineChartData = {
    labels: employeesData.map((employee) => employee.name),
    datasets: [
      {
        label: "Nombre d'événements",
        data: employeesData.map((employee) => employee.events?.length || 0),
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
        label: "Répartition des clients",
        data: assignedCustomersData.map(
          (employee) => employee.customers_assign.length || 0
        ),
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Statistiques des employés",
      },
    },
  };

  return (
    <main className="has-background-white-smoke">
      <div className="columns is-multiline is-mobile">
        <div className="column is-half-desktop is-full-mobile mt-6">
          <div className="box is-shadowless has-background-white mt-6">
            <div className="field">
              <div className={styles["chart-container"]}>
                <Line
                  ref={chartRef}
                  data={lineChartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-half-desktop is-full-mobile mt-6">
          <div className="box is-shadowless has-background-white mt-6">
            <div className="field">
              <div className={styles["chart-container"]}>
                <Pie
                  ref={pieChartRef}
                  data={pieChartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default StatisticsGraph;

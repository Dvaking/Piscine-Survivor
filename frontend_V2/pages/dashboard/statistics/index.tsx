import { useEffect, useState, useRef } from "react";
import { Navbar } from "@components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "@styles/StatisticsPage.module.css";
import "bulma/css/bulma.css";
import { getEmployeesByWork } from "@components";
import { GetEmployeesByWorkProps } from "@types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StaticticsGraph: React.FC = () => {
  const [employeesData, setEmployeesData] = useState<GetEmployeesByWorkProps[]>(
    []
  );
  const chartRef = useRef(null);

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
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
    <main className={styles.main}>
      <Navbar />
      <div className={styles["chart-container"]}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </main>
  );
};

export default StaticticsGraph;

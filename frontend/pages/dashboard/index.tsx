import { useEffect, useState, useRef } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import "bulma/css/bulma.min.css";
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
  BarElement,
} from "chart.js";
import { getEmployeeNameByWork } from "@hooks";
import {
  GetEmployeesNameByWorkProps,
} from "@types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard: React.FC = () => {
  const [employeeNameData, setEmployeeNameData] = useState<GetEmployeesNameByWorkProps[]>(
    []
  );

  const lineChartRef = useRef(null);

  const fetchEmployeeNameData = async () => {
    try {
      const data = await getEmployeeNameByWork();
      const mappedData: GetEmployeesNameByWorkProps[] = data.map((item) => ({
        name: item.name,
      }));

      setEmployeeNameData(mappedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    fetchEmployeeNameData();
  }, []);


  // Line Chart Data (Customers Overview)
  const lineChartData = {
    labels: employeeNameData.map((employee) => employee.name),
    datasets: [
      {
        label: "Number customers",
        data: employeeNameData.map((employee) => employee.name?.length ?? 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Number customers",
        data: employeeNameData.map((employee) => employee.name?.length ?? 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Number customers",
        data: employeeNameData.map((employee) => employee.name?.length ?? 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // Bar Chart Data (Events)
  const barData = {
    labels: [
      "01 Jul",
      "05 Jul",
      "10 Jul",
      "15 Jul",
      "20 Jul",
      "25 Jul",
      "30 Jul",
    ],
    datasets: [
      {
        label: "Events",
        data: [10, 12, 8, 15, 13, 18, 9],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data (Meetings Top Sources)
  const pieData = {
    labels: ["Dating App", "Social Media", "Website"],
    datasets: [
      {
        label: "Meetings Sources",
        data: [300, 150, 100],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className="has-background-white-smoke">
      <div className="container ml-6" style={{ minWidth: "95%" }}>
        <h1 className="title mb-6">Dashboard</h1>
        <h4>Welcome!</h4>

      <div className="is-align-items-flex-start">
        <div className="columns mt-6">
          <div className="column is-three-fifths">
            <div className="box">
              <h2 className="title is-6 mb-0">Customers Overview</h2>
              <h4 className="is-5 mb-6">
                When customers have joined in the time.
              </h4>
              <div className="content">
                <ul>
                  <li>Customers: 932 (+12.37%)</li>
                  <li>Doing Meetings: 28.49% (-12.37%)</li>
                  <li>Customers by Coach: 34</li>
                </ul>
              </div>
              <Line data={lineChartData} />
            </div>
          </div>

          <div className="column is-two-fifths">
            <div className="box">
              <h2 className="title is-6 mb-0">Events</h2>
              <h4 className="is-5 mb-6">Our events and their status</h4>
              <div className="content">
                <ul>
                  <li>Monthly: 83 (+4.63%)</li>
                  <li>Weekly: 20 (-1.92%)</li>
                  <li>Daily (Avg): 3 (+3.45%)</li>
                </ul>
              </div>
              <Bar data={barData} />
            </div>
          </div>
        </div>
        </div>
        <div className="columns">
          <div className="column is-three-fifths">
            <div className="box">
              <h2 className="title is-5">Customers by Country</h2>
              <div className="content">
                <ul>
                  <li>France: 130 (23.54%)</li>
                  <li>United States: 90 (15.44%)</li>
                  <li>Germany: 70 (12.14%)</li>
                  <li>Other: 120 (49.88%)</li>
                </ul>
              </div>
              <div style={{ textAlign: "center" }}>
                <p>Map visualization</p>
              </div>
            </div>
          </div>

          <div className="column is-two-fifths">
            <div className="box">
              <h2 className="title is-5">Meetings Top Sources</h2>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

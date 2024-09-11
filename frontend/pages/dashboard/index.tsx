import { useEffect, useState } from "react";
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
import { getCustomersName, getEvents, getEmployeesByWork } from "@hooks";
import {
  GetCustomersNameProps,
  GetEmployeesByWorkProps,
  GetEventsProps,
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
  const [customerNameData, setCustomersNameData] = useState<GetCustomersNameProps[]>([]);
  const [eventData, setEventData] = useState<GetEventsProps[]>([]);
  const [employeesData, setEmployeesData] = useState<GetEmployeesByWorkProps[]>([]);

  const fetchCustomerNameData = async () => {
    try {
      const data = await getCustomersName();
      setCustomersNameData(data.map((item) => ({ name: item.name })));
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const fetchEmployeesByWorkData = async () => {
    try {
      const data = await getEmployeesByWork();
      setEmployeesData(data.map((item) => ({ name: item.name })));
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const fetchEventData = async () => {
    try {
      const data = await getEvents();
      setEventData(data.map((item) => ({
        name: item.name,
        type: item.type,
        date: item.date,
      })));
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    fetchCustomerNameData();
    fetchEventData();
    fetchEmployeesByWorkData();
  }, []);

  const totalCustomers = customerNameData.length;
  const totalCoaches = employeesData.length;
  const customersPerCoach = totalCoaches > 0 ? Math.floor(totalCustomers / totalCoaches) : 0;

  const eventDates = eventData.map((event) => event.date);
  const eventsCountPerDate = eventDates.reduce<Record<string, number>>((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Bar Data (Events)
  const barData = {
    labels: Object.keys(eventsCountPerDate),
    datasets: [
      {
        label: "Number of Events",
        data: Object.values(eventsCountPerDate),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data (Customers Overview)
  const lineChartData = {
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
        label: "Number customers",
        data: customerNameData.map((customer) => customer.name?.length ?? 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Number events",
        data: eventData.map((events) => events.name.length ?? 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
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
                    <li>Customers: {totalCustomers}</li>
                    <li>Doing Meetings: 28.49%</li>
                    <li>Customers by Coach: {customersPerCoach}</li>
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

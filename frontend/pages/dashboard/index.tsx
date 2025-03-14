import { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Cookies from "js-cookie";
import router from "next/router";
import "bulma/css/bulma.min.css";
import styles from "@styles/Dashboard.module.css";
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
import { getCustomersName, getEvents, getEmployeesByWork, getEncounters } from "@hooks";
import {
  GetCustomersNameProps,
  GetEmployeesByWorkProps,
  GetEncountersProps,
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

export default function Dashboard() {
  const [customerNameData, setCustomersNameData] = useState<
    GetCustomersNameProps[]
  >([]);
  const [eventData, setEventData] = useState<GetEventsProps[]>([]);
  const [employeesData, setEmployeesData] = useState<GetEmployeesByWorkProps[]>(
    []
  );
  const [encountersData, setEncountersData] = useState<GetEncountersProps[]>([]);

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
      setEventData(
        data.map((item) => ({
          name: item.name,
          type: item.type,
          date: item.date,
        }))
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const fetchEncountersData = async () => {
    try {
      const data = await getEncounters();
      setEncountersData(data.map((item) => ({ source: item.source })));
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
    fetchCustomerNameData();
    fetchEventData();
    fetchEmployeesByWorkData();
    fetchEncountersData();
  }, []);

  const totalCustomers = customerNameData.length;
  const totalCoaches = employeesData.length;
  const customersPerCoach =
    totalCoaches > 0 ? Math.floor(totalCustomers / totalCoaches) : 0;

  const eventDates = eventData.map((event) => event.date);
  const eventsCountPerDate = eventDates.reduce<Record<string, number>>(
    (acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const totalEvents = Object.values(eventsCountPerDate).reduce(
    (acc, count) => acc + count,
    0
  );
  const numberOfDays = new Set(eventDates).size;
  const numberOfWeeks = Math.ceil(numberOfDays / 7);
  const numberOfMonths = Math.ceil(numberOfDays / 30);

  const monthlyAverage = Math.floor(totalEvents / numberOfMonths);
  const weeklyAverage = Math.floor(totalEvents / numberOfWeeks);
  const dailyAverage = Math.floor(totalEvents / numberOfDays);

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
        backgroundColor: "rgb(110, 110, 110)",
        borderColor: "rgba(110, 110, 110, 0.2)",
      },
    ],
  };

  const encountersTypeCounts = encountersData.reduce<Record<string, number>>(
    (acc, encounters) => {
      acc[encounters.source] = (acc[encounters.source] || 0) + 1;
      return acc;
    },
    {}
  );

  const topEncountersSource = Object.entries(encountersTypeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const doughnutData = {
    labels: topEncountersSource.map(([type]) => type),
    datasets: [
      {
        label: "Meetings Types",
        data: topEncountersSource.map(([, count]) => count),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
        radius: "50%",
      },
    ],
  };

  // const doughnutCustomerData = {
  //   labels: topEncountersSource.map(([type]) => type),
  //   datasets: [
  //     {
  //       label: "Event Types",
  //       data: topEncountersSource.map(([, count]) => count),
  //       backgroundColor: [
  //         "rgba(255, 99, 71, 0.6)",
  //         "rgba(100, 149, 237, 0.6)",
  //         "rgba(255, 105, 180, 0.6)",
  //         "rgba(60, 179, 113, 0.6)",
  //         "rgba(255, 165, 0, 0.6)",
  //         "rgba(255, 20, 147, 0.6)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 71, 1)",
  //         "rgba(100, 149, 237, 1)",
  //         "rgba(255, 105, 180, 1)",
  //         "rgba(60, 179, 113, 1)",
  //         "rgba(255, 165, 0, 1)",
  //         "rgba(255, 20, 147, 1)",
  //       ],
  //       borderWidth: 1,
  //       radius: "50%",
  //     },
  //   ],
  // };

  return (
    <main className="has-background-white-smoke">
      <div className={`${styles["container-wide"]}`}>
        <div>
          <h3 className="title is-size-4-mobile is-size-3-tablet is-size-2-desktop mb-2">
            Dashboard
          </h3>
          <h4 className="is-size-5-mobile mb-2">Welcome!</h4>
        </div>
        <div className="columns is-multiline">
          <div className="column is-12-mobile is-8-tablet is-6-desktop">
            <div className="box">
              <h2 className="title is-6 mb-3">Customers Overview</h2>
              <h4 className="is-5 mb-5">When customers have joined in the time.</h4>
              <div className="content">
                <div className="columns is-centered">
                  <div className="column is-narrow">
                    <p>Customers: {totalCustomers}</p>
                  </div>
                  <div className="column is-narrow">
                    <p>Doing Meetings: 28.49%</p>
                  </div>
                  <div className="column is-narrow">
                    <p>Customers by Coach: {customersPerCoach}</p>
                  </div>
                </div>
              </div>
              <Line data={lineChartData} />
            </div>
          </div>

          <div className="column is-12-mobile is-8-tablet is-6-desktop">
            <div className="box">
              <h2 className="title is-6 mb-3">Events</h2>
              <h4 className="is-5 mb-5">Our events and their status.</h4>
              <div className="content">
                <div className="columns is-mobile is-centered">
                  <div className="column is-narrow">
                    <p>Monthly: {monthlyAverage}</p>
                  </div>
                  <div className="column is-narrow">
                    <p>Weekly: {weeklyAverage}</p>
                  </div>
                  <div className="column is-narrow">
                    <p>Daily (Avg): {dailyAverage}</p>
                  </div>
                </div>
              </div>
              <Bar data={barData} />
            </div>
          </div>
        </div>

          {/* If is not usable dont show */}
        <div className="columns is-multiline">
          {/* <div className="column is-12-mobile is-8-tablet is-6-desktop">
            <div className="box">
              <h2 className="title is-5">Customers by Country</h2>
              <div style={{ textAlign: "center" }}>
                <Doughnut data={doughnutCustomerData} />
              </div>
              <div className="content">
                <ul>
                  <li>France: 130 (23.54%)</li>
                  <li>United States: 90 (15.44%)</li>
                  <li>Germany: 70 (12.14%)</li>
                  <li>Other: 120 (49.88%)</li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="column is-12-mobile is-8-tablet is-6-desktop">
            <div className="box">
              <h2 className="title is-5">Meetings Top Sources</h2>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

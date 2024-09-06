"use client";

import { useRouter } from "next/router";
import Navbar from '../../Components/Navbar/Navbar';
import React, { useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './page.module.css';

import 'bulma/css/bulma.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function StaticticsGraph() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!user) router.push("/");
  const chartRef = useRef(null);

  const data = {
    labels: ['Coach 1', 'Coach 2', 'Coach 3', 'Coach 4', 'Coach 5', 'Coach 6', 'Coach 7'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Coaches statistics',
      },
    },
  };
  const handleCustomersClick = () => {
    router.push("/dashboard/customers");
  };
  const handleTipsClick = () => {
    router.push("../dashboard/tips");
  };
  const handleStaticticsClick = () => {
    router.push("../dashboard/statistics");
  }
  const handleDashboardClick = () => {
    router.push("../dashboard");
  };
  return (
    <main className={styles.main}>
    <Navbar />
    <div className={styles['chart-container']}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
    </main>
  );
};

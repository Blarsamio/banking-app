"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";


ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const isDarkMode = useTheme().theme === "dark";
  const accountNames = accounts.map((account) => account.name);
  const accountBalances = accounts.map((account) => account.currentBalance);

  const data = {
    datasets: [
      {
        label: "Balance",
        data: accountBalances,
        backgroundColor: isDarkMode
          ? ["#E5E5E5", "#2A2B2A", "#F8F4E3"] // Dark mode colors
          : ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: accountNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;

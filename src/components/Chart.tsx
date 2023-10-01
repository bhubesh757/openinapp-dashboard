'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = ['Week1' , 'Week2' , 'Week3' , 'Week4'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Guest',
      data: [500 , 350 , 250 , 400],
      backgroundColor: '#98D89E',
    },
    {
        label: 'User',
        data: [450 , 480 , 320 , 450],
        backgroundColor: '#EE8484',
      },
  ],
};

export default function App() {
  return <Bar options={options} data={data} />;
}

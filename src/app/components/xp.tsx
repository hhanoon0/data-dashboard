import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Xps } from "../../lib/api"; // Import the Xps function

interface Transaction {
  type: string;
  amount: number;
  createdAt: string;
}

export function XPBarChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await Xps();
        setTransactions(data.transaction); // Ensure the correct path to the transaction array
      } catch (err: any) {
        setError(err.message || "Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (transactions.length === 0) {
    return <div>Loading...</div>;
  }

  // Group transactions by month and sum the amounts
  const groupedData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  // Format the grouped data for the bar chart
  const chartData = Object.entries(groupedData).map(([month, totalAmount]) => ({
    month,
    amount: totalAmount,
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            label={{ value: "Month", position: "insideBottom", offset: -5 }} 
          />
          <YAxis 
            label={{ value: "Total XP", angle: -90, position: "insideLeft" }} 
          />
          <Tooltip />
          <Bar dataKey="amount" fill="#FF2056" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default XPBarChart;
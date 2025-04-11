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

  // Format data for the bar chart
  const chartData = transactions.map((transaction) => ({
    createdAt: new Date(transaction.createdAt).toLocaleDateString(), // Format date
    amount: transaction.amount,
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default XPBarChart;
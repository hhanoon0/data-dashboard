"use client";

import React, { useEffect, useState } from "react";
import { fetchUserId } from "../../lib/api"; // Import the fetchUserId function
import ChartComponent from "../components/audit"; 
import { XPBarChart } from "../components/xp"; // Import the XPBarChart component

const DashboardPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [xpData, setXpData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user ID using the imported function
        const data = await fetchUserId();

        // Replace with your own logic to fetch user data
        const user = {
          id: data[1],
          firstname: data[2],
          lastname:data[3],
          email:data[4],
          joinedAt:new Date(data[5]).toLocaleDateString(),
        }; // Example mock data
        setUserData(user);
        console.log(data);

        // Replace with your own logic to fetch XP data
        const xp = [
          { id: 1, createdAt: new Date().toISOString(), amount: 100, path: "mockPath" },
        ]; // Example mock data
        setXpData(xp);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);
  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {userData && (
        <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2>User Info</h2>
          <p><strong>ID</strong> {userData.id}</p>
          <p><strong>First Name</strong> {userData.firstname}</p>
          <p><strong>Last Name</strong> {userData.lastname}</p>
          <p><strong>Email</strong> {userData.email}</p>
          <p><strong>Joined date</strong> {userData.joinedAt}</p>

        </div>
      )}

      {/* XP Transactions */}
      {xpData.length > 0 && (
        <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2>XP Transactions</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>Date</th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>Amount</th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>Path</th>
              </tr>
            </thead>
            <tbody>
              {xpData.map((transaction) => (
                <tr key={transaction.id}>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{transaction.amount}</td>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>{transaction.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
<ChartComponent/>
<XPBarChart/>
    </div>
  );
};

export default DashboardPage;




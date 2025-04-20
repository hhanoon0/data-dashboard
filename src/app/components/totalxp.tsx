import React, { useEffect, useState } from "react";
import { XPsum } from "../../lib/api";

export const TotalXP: React.FC = () => {
  const [totalXP, setTotalXP] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalXP = async () => {
      try {
        const sum = await XPsum(); // Call the updated XPsum function
        setTotalXP(sum.transaction_aggregate.aggregate.sum.amount); // Set the total XP in state
      } catch (err) {
        console.error("Error fetching total XP:", err);
        setError("Failed to fetch total XP");
      }
    };

    fetchTotalXP();
  }, []);
    console.log("totalxp:", totalXP); // Log the total XP
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Ensures the content is vertically centered within the parent container
      }}
    >
      {totalXP !== null ? (
        <p style={{ fontSize: "100px", margin: 0, fontWeight: "bold", color: "#8884d8" }}>
          {Math.floor(totalXP / 10 / 1024)}
          <span style={{ fontSize: "40px", fontWeight: "lighter", marginLeft: "5px" }}>kB</span>
        </p>
      ) : (
        <p style={{ fontSize: "100px", margin: 0, fontWeight: "bold" }}>Loading...</p>
      )}
    </div>
  );
};

export default TotalXP;
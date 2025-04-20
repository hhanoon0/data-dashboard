import React, { useEffect, useState } from "react";
import { XPsum } from "../../lib/api";

export const TotalXP: React.FC = () => {
  const [totalXP, setTotalXP] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalXP = async () => {
      try {
        const sum = await XPsum(); // Call the updated XPsum function
        setTotalXP(sum.transaction); // Set the total XP in state
      } catch (err) {
        console.error("Error fetching total XP:", err);
        setError("Failed to fetch total XP");
      }
    };

    fetchTotalXP();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Total XP</h1>
      {totalXP !== null ? <p>{totalXP}</p> : <p>Loading...</p>}
    </div>
  );
};

export default TotalXP;
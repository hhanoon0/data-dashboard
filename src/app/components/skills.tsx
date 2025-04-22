import React, { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";
import { Mke } from "../../lib/api";


export function SkillsRadarChart () {
  const [skillsData, setSkillsData] = useState<{ type: string; amount: number }[]>([]);
  interface CodingSkill {
    type: string;
    // other fields based on your data
  }
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await Mke();
        if (Array.isArray(data.transaction)) {
          // Replace underscores with spaces in the type field
          const formattedData = data.transaction.map((item:CodingSkill) => ({
            ...item,
            type: item.type.replace(/_/g, " ").replace(/skill/gi, "").trim(),
          }));
          setSkillsData(formattedData);
        } else {
          console.error("Unexpected data format:", data);
          setSkillsData([]);
        }
      } catch (error) {
        console.error("Error fetching skills data:", error);
        setSkillsData([]);
      }
    };

    fetchSkills();
  }, []);

  if (skillsData.length === 0) {
    return <p style={{ color: "#ffffff", textAlign: "center" }}>No skill data available</p>;
  }

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", textAlign: "center", color: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ResponsiveContainer width="100%" aspect={1.2 } minWidth={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={skillsData}   margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="type" 
            stroke="#ffffff"
            tick={{ fontWeight: "bold"}} // Adjust dy for vertical spacing
          />
          <Radar
            name="Skill Levels"
            dataKey="amount"
            stroke="#FF2056"
            fill="#FF2056"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: "20px", fontSize: "14px" }}>
      </div>
    </div>
  );
};

export default SkillsRadarChart;






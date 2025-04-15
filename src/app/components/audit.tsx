import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import {Audits} from "../../lib/api"; // Import the Audits function


interface AuditDataType {
    AuditRatio: number;
    totalUp: number;
    totalDown: number;
  }

export function ChartComponent() {
    const [error, setError] = useState<string | null>(null);
    const [auditData, setAuditData] = useState<AuditDataType | null>(null);
  
    // Fetch user data
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch audit data using the imported function
          const data = await Audits();
  
          // Update state with fetched data
          const formattedData: AuditDataType = {
            AuditRatio: data[0],
            totalUp: (data[1]/1000000),
            totalDown: (data[2]/1000000),
          };
          console.log("audit info", formattedData); // Log the audit data
          setAuditData(formattedData);
        } catch (error: any) {
          setError(error.message || "Failed to fetch data");
        }
      };
  
      fetchData();
    }, []);

const data = [
  {
    name: 'Your Audits credits',
  },
];



const pieData = [
  { name: 'Total Down', value: auditData?.totalDown },
    { name: 'Total Up', value: auditData?.totalUp },
];

const COLORS = ['#8884d8', '#82ca9d'];
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360); // Rotate by 2 degrees
    }, 2000); // Adjust speed by changing interval time

    const timeout = setTimeout(() => {
      clearInterval(interval); // Stop spinning after 2000ms
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      {/* Spinning Donut Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            startAngle={rotation}
            endAngle={rotation + 360}
            fill="#8884d8"
            label={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='none' />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {/* Audit Ratio in the center of the donut */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {auditData?.AuditRatio.toFixed(2)}
      </div>
    </div>
  );
}

export default ChartComponent;

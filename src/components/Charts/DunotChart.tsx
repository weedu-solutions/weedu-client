import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 }
];
const COLORS = ["#011627", "#E71D36"];

export default function DunotChart() {
  return (
    <PieChart width={350} height={250}>
      <Pie
        data={data}
        cx={150}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

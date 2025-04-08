import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const mockMessagesData = [
  { date: "Lun", messages: 12 },
  { date: "Mar", messages: 18 },
  { date: "Mie", messages: 10 },
  { date: "Jue", messages: 22 },
  { date: "Vie", messages: 17 },
];

const mockMonthlyMessagesData = [
    { date: "1", messages: 5 },
    { date: "2", messages: 8 },
    { date: "3", messages: 4 },
    { date: "4", messages: 10 },
    { date: "5", messages: 3 },
    { date: "6", messages: 7 },
    { date: "7", messages: 6 },
    { date: "8", messages: 9 },
    { date: "9", messages: 2 },
    { date: "10", messages: 11 },
    { date: "11", messages: 4 },
    { date: "12", messages: 13 },
    { date: "13", messages: 3 },
    { date: "14", messages: 8 },
    { date: "15", messages: 6 },
    { date: "16", messages: 5 },
    { date: "17", messages: 12 },
    { date: "18", messages: 9 },
    { date: "19", messages: 7 },
    { date: "20", messages: 10 },
    { date: "21", messages: 4 },
    { date: "22", messages: 6 },
    { date: "23", messages: 11 },
    { date: "24", messages: 5 },
    { date: "25", messages: 3 },
    { date: "26", messages: 9 },
    { date: "27", messages: 6 },
    { date: "28", messages: 7 },
    { date: "29", messages: 2 },
    { date: "30", messages: 4 },
  ];
  

const mockTopStudents = [
  { name: "Juan Perez", count: 14 },
  { name: "Ana García", count: 11 },
  { name: "Luis Torres", count: 9 },
  { name: "María Díaz", count: 8 },
  { name: "Carlos Ruiz", count: 7 },
  { name: "Lucía Ramos", count: 6 },
  { name: "Pedro Luna", count: 6 },
  { name: "Elena Vega", count: 5 },
  { name: "Sofía Mendoza", count: 5 },
  { name: "Tomás Herrera", count: 4 },
];

export default function WhatsappDashboard() {
  const [balance, setBalance] = useState(54.25);
  const [manualSent, setManualSent] = useState(102);
  const [autoSent, setAutoSent] = useState(78);

  console.log(setBalance);
  console.log(setManualSent);
  console.log(setAutoSent);
  
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6  text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Servicio de Whatsapp</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card title="Balance" value={`$${balance.toFixed(2)}`} color='text-green-500' />
        <Card title="Mensajes Manuales" value={manualSent} />
        <Card title="Mensajes Automáticos" value={autoSent} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <ChartCard title="Mensajes Enviados Esta Semana">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockMessagesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Bar dataKey="messages" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="col-span-1 md:col-span-2">
        <ChartCard title="Mensajes Enviados Este Mes">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockMonthlyMessagesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="messages" stroke="#4ade80" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        </div>
      </div>

      <div className="my-8">
        <ChartCard title="Los estudiantes a quien más se les ha enviado mensajes esta semana">
        <ul className="space-y-2">
            {mockTopStudents.map((s, i) => (
                <li
                key={i}
                className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-2 shadow hover:bg-slate-700 transition-all"
                >
                <div className="flex items-center gap-3">
                    <span className="text-sm w-6 h-6 flex items-center justify-center bg-slate-600 text-white rounded-full font-semibold">
                    {i + 1}
                    </span>
                    <span className="text-white font-medium">{s.name}</span>
                    {i === 0 && <span className="ml-1">🥇</span>}
                </div>
                <span className="text-sm bg-emerald-600 text-white px-2 py-1 rounded-md font-semibold">
                    {s.count} msg
                </span>
                </li>
            ))}
        </ul>
        </ChartCard>
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Mensajes Enviados Hoy">
          <p className="text-2xl font-semibold">18 Mensajes</p>
        </ChartCard>
      </div>
    </motion.div>
  );
}

function Card({ title, value, color }: { title: string; value: string | number; color?: string  }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col justify-between">
      <p className={`text-slate-400 text-sm mb-2`}>{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode;}) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
      <h2 className={`text-lg font-semibold mb-4`}>{title}</h2>
      {children}
    </div>
  );
}

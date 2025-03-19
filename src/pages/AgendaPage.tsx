import { useState } from "react";
import { motion } from "framer-motion";

// Sample Data
const sampleAgendas = [
  {
    id: 1,
    student: "John Doe",
    classGroup: "Math 101",
    messages: [
      { id: 1, author: "Mr. Smith", type: "informative", content: "Class is rescheduled to 10 AM.", created_at: "2024-07-26" },
      { id: 2, author: "Assistant", type: "attention", content: "Homework is due tomorrow.", created_at: "2024-07-25" },
    ],
  },
  {
    id: 2,
    student: "Jane Doe",
    classGroup: "Science 102",
    messages: [
      { id: 3, author: "Dr. Brown", type: "emergency", content: "School is closed due to weather.", created_at: "2024-07-26" },
    ],
  },
];

const messageStyles = {
  I: "bg-blue-100 border-blue-500",
  A: "bg-yellow-100 border-yellow-500",
  E: "bg-red-100 border-red-500",
};

export default function Agenda() {
  const [agendas, setAgendas] = useState(sampleAgendas);
  const [newMessage, setNewMessage] = useState({
    agendaId: sampleAgendas[0].id,
    type: "informative",
    content: "",
    author: "You", // Replace with the logged-in user's name
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.content.trim()) return;

    const updatedAgendas = agendas.map((agenda) => {
      if (agenda.id === newMessage.agendaId) {
        return {
          ...agenda,
          messages: [
            ...agenda.messages,
            {
              id: Date.now(),
              author: newMessage.author,
              type: newMessage.type,
              content: newMessage.content,
              created_at: new Date().toISOString().split("T")[0],
            },
          ],
        };
      }
      return agenda;
    });

    setAgendas(updatedAgendas);
    setNewMessage({ ...newMessage, content: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Agenda
      </motion.h1>

      {/* Message Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold">Add a New Message</h2>
        
        <label className="block">
          <span className="text-sm font-medium">Agenda</span>
          <select
            value={newMessage.agendaId}
            onChange={(e) => setNewMessage({ ...newMessage, agendaId: Number(e.target.value) })}
            className="mt-1 block w-full p-2 border rounded-lg"
          >
            {agendas.map((agenda) => (
              <option key={agenda.id} value={agenda.id}>
                {agenda.student ? `For ${agenda.student}` : `For ${agenda.classGroup}`}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Message Type</span>
          <select
            value={newMessage.type}
            onChange={(e) => setNewMessage({ ...newMessage, type: e.target.value })}
            className="mt-1 block w-full p-2 border rounded-lg"
          >
            <option value="informative">Informative</option>
            <option value="attention">Attention</option>
            <option value="emergency">Emergency</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Message Content</span>
          <textarea
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            className="mt-1 block w-full p-2 border rounded-lg"
            rows={3}
          />
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
          Add Message
        </button>
      </motion.form>

      {/* Agendas List */}
      {agendas.map((agenda) => (
        <motion.div
          key={agenda.id}
          className="bg-slate-800 shadow-lg rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold ">
            {agenda.student ? `Agenda for ${agenda.student}` : `Agenda for ${agenda.classGroup}`}
          </h2>
          <div className="mt-3 space-y-3">
            {agenda.messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`p-3 border-l-4 rounded-lg shadow-sm ${messageStyles[msg.type as keyof typeof messageStyles]}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-gray-800">{msg.content}</p>
                <div className="text-xs text-gray-500 mt-1 flex justify-between">
                  <span>By {msg.author}</span>
                  <span>{msg.created_at}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RiEditFill, RiDeleteBin6Fill } from "@remixicon/react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { categories as initialCategories } from "../data/mockdataForGrades";
import Categories from "../components/api/category/Categories";

const CategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({ name: "", weight: 0 });
  const [editing, setEditing] = useState<string | null>(null);

  // Calculate total weight percentage
  const totalWeight = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.weight, 0) * 100;
  }, [categories]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory({ ...newCategory, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  // Add a new category
  const handleAddCategory = () => {
    if (!newCategory.name || newCategory.weight <= 0) return;
    setCategories([...categories, { id: Date.now().toString(), ...newCategory }]);
    setNewCategory({ name: "", weight: 0 });
  };

  // Delete a category
  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Update category
  const handleUpdate = () => {
    setCategories(
      categories.map((cat) => (cat.id === editing ? { ...cat, ...newCategory } : cat))
    );
    setEditing(null);
    setNewCategory({ name: "", weight: 0 });
  };

  return (
    <Categories />
    // <div className="w-full max-w-4xl mx-auto p-6 shadow-lg rounded-lg pb-20">
    //   <motion.div
    //     initial={{ opacity: 0, y: -10 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}    
    // >
    //     {/* Header */}
    //     <h2 className="text-3xl font-bold text-center mb-6 pt-10">📊 Categorías de Evaluación</h2>

    //     {/* Total Weight Warning */}
    //     <div
    //     className={`text-center font-semibold p-3 rounded-md mb-4 ${
    //         totalWeight.toFixed(2) === '100.00' ? "bg-green-500 text-white" : "bg-red-500 text-white"
    //     }`}
    //     >
    //     Peso total: {totalWeight.toFixed(2)}%
    //     {totalWeight.toFixed(2) !== '100.00' && <p>Asegúrate de que el total sea 100%.</p>}
    //     </div>
    //   </motion.div>

    //   {/* Form to Add/Edit Categories */}
    //   <motion.div 
    //     initial={{ opacity: 0, y: 10 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="flex flex-col md:flex-row gap-4 mb-6">
    //     <Input 
    //         name="name"
    //         placeholder="Nombre"
    //         value={newCategory.name}
    //         onChange={handleInputChange}
    //     />
    //     <Input 
    //         name="weight"
    //         placeholder="Peso (ej. 0.3)"
    //         value={newCategory.weight}
    //         onChange={handleInputChange}
    //         type="number"
    //         min="0"
    //         step="0.01"
    //     />
    //     {editing ? (
    //       <Button onClick={handleUpdate} label="Actualizar" />
    //     ) : (
    //       <Button onClick={handleAddCategory} label="Añadir" />
    //     )}
    //   </motion.div>

    //   {/* Category List */}
    //   <motion.div 
    //     initial={{ opacity: 0, y: 10 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="bg-gray-900 p-4 rounded-lg shadow-md">
    //     {categories.map((category) => (
    //       <motion.div
    //         key={category.id}
    //         className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow mb-4 hover:bg-gray-700 cursor-pointer"
    //         initial={{ opacity: 0, y: 10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //       >
    //         <span className="font-semibold">{category.name} - {category.weight * 100}%</span>
    //         <div className="flex gap-2">
    //           <button onClick={() => {
    //             setEditing(category.id);
    //             setNewCategory(category);
    //           }} className="text-blue-500 hover:text-blue-700">
    //             <RiEditFill size={20} />
    //           </button>
    //           <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700">
    //             <RiDeleteBin6Fill size={20} />
    //           </button>
    //         </div>
    //       </motion.div>
    //     ))}
    //   </motion.div>

    //   {/* Chart */}
    //   <div className="mt-8">
    //     <h3 className="text-xl font-bold text-center mb-4">📈 Distribución de Peso</h3>
    //     <ResponsiveContainer width="100%" height={250}>
    //       <BarChart data={categories}>
    //         <XAxis dataKey="name" />
    //         <YAxis />
    //         <Tooltip />
    //         <Bar dataKey="weight" fill={(totalWeight).toFixed(2) === '100.00' ? "#3b82f6" : "#F44336"} radius={[5, 5, 0, 0]} />
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </div>
    // </div>
  );
};

export default CategoriesPage;

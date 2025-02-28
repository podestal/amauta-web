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
    <div className="w-full max-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-start items-center pt-10">
      <Categories />
    </div>

    // <div className="w-full max-w-4xl mx-auto p-6 shadow-lg rounded-lg pb-20">

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


    //   {/* Chart */}

    // </div>
  );
};

export default CategoriesPage;

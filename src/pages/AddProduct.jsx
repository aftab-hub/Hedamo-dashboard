import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [step, setStep] = useState(1);
  // const { setProducts } = useContext(Context);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    explanation: "",
    status: "Pending AI Review",
    score: "",
    suggestions: [],
    flags: [],
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("⚠️ Product name is required.");
      return false;
    }
    if (!formData.explanation.trim()) {
      alert("⚠️ Product explanation is required.");
      return false;
    }
    return true;
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

  const newProduct = {
  ...formData,
  score: Number(formData.score) || 0,
  createdAt: new Date().toISOString(),
};


    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      setProducts((prev) => [...prev, data]);

      alert("✅ Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("❌ Failed to add product. Check console for details.");
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            🛒 Add New Product
          </h2>

          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto border border-gray-100">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-medium text-gray-800">
                      Basic Information
                    </h3>

                    <input
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <textarea
                      name="explanation"
                      placeholder="Product Description / Explanation"
                      value={formData.explanation}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />

                    <input
                      type="number"
                      name="score"
                      placeholder="AI Score (0 - 100)"
                      value={formData.score || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-sm transition"
                      >
                        Next →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-medium text-gray-800">
                      Product Status
                    </h3>

                    <input
                      type="text"
                      name="status"
                      placeholder="Status (e.g., Pending AI Review)"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <textarea
                      name="suggestions"
                      placeholder="Suggestions (comma-separated)"
                      value={formData.suggestions.join(", ")}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          suggestions: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        }))
                      }
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />

                    <textarea
                      name="flags"
                      placeholder="Flags (comma-separated)"
                      value={formData.flags.join(", ")}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          flags: e.target.value
                            .split(",")
                            .map((f) => f.trim())
                            .filter(Boolean),
                        }))
                      }
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-xl transition"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-sm transition"
                      >
                        Next →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-medium text-gray-800">
                      Confirm & Submit
                    </h3>

                    <p className="text-gray-600 text-sm">
                      Please confirm all details before submitting.
                    </p>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-xl transition"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-sm transition"
                      >
                        ✅ Submit
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;

import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { number } from "motion-dom";

const ProductTable = ({ products, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    explanation: "",
    status: "",
    score: ""
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent":
        return "text-green-600";
      case "Moderate":
        return "text-yellow-600";
      case "Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // ✅ Open modal with pre-filled product data
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setEditedData({
      name: product.name || "",
      explanation: product.explanation || "",
      status: product.status || "Pending AI Review",
      score: product.score || 0,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save edited data
  const handleSave = () => {
    if (currentProduct) {
      onEdit(currentProduct.id, editedData);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-4 text-left font-semibold">Product Name</th>
            <th className="p-4 text-left font-semibold">Score</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-4 text-gray-800 font-medium">{p.name}</td>
              <td className="p-4 font-semibold text-blue-600">
                {p.score !== null ? p.score : "N/A"}
              </td>
              <td className={`p-4 font-medium ${getStatusColor(p.status)}`}>
                {p.status}
              </td>
              <td className="p-4">
                <div className="flex gap-5">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="text-sm text-blue-700 cursor-pointer"
                    title="Edit"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-sm text-red-500 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 />
                  </button>
                  <Link
                    to={`/product/${p.name.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-blue-600 hover:underline"
                    title="View Details"
                  >
                    <Eye />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Edit Product
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                placeholder="Product name"
              />
              <textarea
                name="explanation"
                value={editedData.explanation}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                placeholder="Product explanation"
                rows={3}
              />
              <input
                type="text"
                name="status"
                value={editedData.status}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                placeholder="Status"
              />
              <input
                type="number"
                name="score"
                value={editedData.score}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                placeholder="Score"
              />
       
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;

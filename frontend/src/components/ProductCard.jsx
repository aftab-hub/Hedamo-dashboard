import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800 dark";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 dark";
      case "Low":
        return "bg-red-100 text-red-800 dark";
      default:
        return "bg-gray-100 text-gray-700 dark";
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h4>

      {/* Score Circle */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-blue-600">
          {product.score}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
          {product.status}
        </span>
      </div>

      {/* Details Link */}
      <Link
        to={`/product/${product.name.replace(/\s+/g, "-").toLowerCase()}`}
        className="text-blue-600 font-medium text-sm hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
};

export default ProductCard;

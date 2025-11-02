import { useParams, useNavigate } from "react-router-dom";
import RadialChart from "../components/RadialChart";
import FlagBadge from "../components/FlagBadge";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

const [product, setProduct] = useState(null);

useEffect(() => {
  fetch(`http://localhost:3001/products`)
    .then(res => res.json())
    .then(data => {
      const found = data.find(
        (p) => p.name.replace(/\s+/g, "-").toLowerCase() === id
      );
      setProduct(found);
    });
}, [id]);


  if (!product) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
        <button
          onClick={() => navigate(-1)}
          className=" bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        >
          ← Back
        </button>
      </div>

      {/* Transparency Score */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <RadialChart score={product.score} />
        <div>
          <p className="text-lg text-gray-600 mb-2">{product.explanation}</p>
          <h4 className="text-xl font-semibold text-gray-700 mb-3">
            AI Suggestions:
          </h4>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {product.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Flags */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h4 className="text-lg font-semibold mb-3 text-gray-700">
          Risk Flags:
        </h4>
        <div className="flex flex-wrap gap-2">
          {product.flags.map((flag, index) => (
            <FlagBadge key={index} text={flag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

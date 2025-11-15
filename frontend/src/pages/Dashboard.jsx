import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Context } from "../Context/Context";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { searchTerm, backendUrl } = useContext(Context);

  // ✅ Fetch recent products dynamically from json-server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/products`);
        const data = await res.json();

        // Sort by createdAt if available, else reverse (to get latest)
        const sorted = data.sort((a, b) =>
          a.createdAt && b.createdAt
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : 0
        );

       
        setProducts(sorted);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);


// ✅ AI Suggestions (all time)
const totalAISuggestions = products.reduce(
  (acc, p) => acc + (p.suggestions?.length || 0),
  0
);

// ✅ AI Flags (all time)
const totalAIFlags = products.reduce(
  (acc, p) => acc + (p.flags?.length || 0),
  0
);


  // ✅ Summary cards (dynamic)
  const summaryData = [
    {
      title: "Total Products",
      value: products.length,
      gradient: "from-indigo-400 to-blue-600 text-blue-900",
    },
    {
      title: "Avg. Transparency Score",
      value:
        products.length > 0
          ? `${Math.round(
              products.reduce((acc, p) => acc + (p.score || 0), 0) /
                products.length
            )}%`
          : "0%",
      gradient: "from-green-400 to-emerald-600 text-green-900",
    },
    {
      title: "High-Risk Products",
      value: products.filter((p) => (p.score || 0) < 60).length,
      gradient: "from-red-400 to-rose-600 text-red-900",
    },
    {
      title: "AI Suggestions ", 
      value: totalAISuggestions,
      gradient: "from-yellow-300 to-orange-500 text-yellow-900",
    },
    
  ];

  // ✅ Chart data (can later be made dynamic)
const chartData = (() => {
  if (!products.length) return [];

  const monthlyData = {};

  products.forEach((p) => {
    const date = p.createdAt ? new Date(p.createdAt) : new Date();
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) {
      monthlyData[month] = { month, aiScore: 0, count: 0 };
    }

    monthlyData[month].aiScore += Number(p.score) || 0;
    monthlyData[month].count += 1;
  });

  // ✅ reverse order for chart (latest month first)
  return Object.values(monthlyData)
    .map((m) => ({
      month: m.month,
      aiScore: Math.round(m.aiScore / m.count),
      userRating: Math.min(Math.round(m.aiScore / m.count) + 10, 100),
    }))
    .reverse();
})();


  // ✅ Filter products by search term
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="space-y-8">
      {/* 🏷️ Header */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Dashboard Overview
      </h2>

      {/* 🌈 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-md bg-linear-to-r ${item.gradient} transition-transform transform hover:scale-105 duration-200`}
          >
            <p className="text-lg font-medium opacity-90">{item.title}</p>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 📈 Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          AI Transparency & User Rating Trends
        </h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height={300} >
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                axisLine={false}
                tickLine={false}
              />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="aiScore"
                stroke="#4f46e5"
                fill="url(#colorAi)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="userRating"
                stroke="#10b981"
                fill="url(#colorUser)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🆕 Recent Products Section */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
  {filteredProducts.length > 0 ? (
    filteredProducts
      .slice(0, 4) // 👈 Show only 3 latest products
      .map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
  ) : (
    <p className="text-gray-500 col-span-full text-center">
      No matching products found.
    </p>
  )}
</div>

    </div>
  );
};

export default Dashboard;  
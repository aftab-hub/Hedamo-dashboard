import { useEffect, useState } from "react";

const RadialChart = ({ score }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke="#E5E7EB"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke="#3B82F6"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-blue-600">{progress}%</p>
        <p className="text-xs text-gray-500">Transparency</p>
      </div>
    </div>
  );
};

export default RadialChart;

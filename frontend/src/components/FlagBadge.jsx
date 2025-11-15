const FlagBadge = ({ text }) => {
  const getColor = (text) => {
    if (text.toLowerCase().includes("high")) return "bg-red-100 text-red-700";
    if (text.toLowerCase().includes("medium")) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <span className={`px-3 py-1 text-sm rounded-full font-medium ${getColor(text)}`}>
      ⚠️ {text}
    </span>
  );
};

export default FlagBadge;

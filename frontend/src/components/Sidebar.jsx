import { Home, Package, PlusCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isActive, setIsActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Products", icon: <Package size={20} />, path: "/products" },
    { name: "Add Product", icon: <PlusCircle size={20} />, path: "/add-product" },
  ];

  // ✅ Helper for clicking menu
  const handleMenuClick = (itemName) => {
    setIsActive(itemName);
    if (window.innerWidth < 1024) {
      // Close sidebar only for small screens
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`absolute lg:static top-0 left-0 w-64 bg-white text-gray-900 p-4 border-r border-gray-200 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close button (mobile only) */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h1 className="text-2xl font-bold text-center">Hedamo</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Logo (desktop) */}
        <h1 className="text-2xl font-bold mb-8 text-center hidden lg:block">
          Hedamo
        </h1>

        {/* Menu Items */}
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => handleMenuClick(item.name)}
                className={`flex items-center gap-3 p-2 rounded-md transition cursor-pointer ${
                  isActive === item.name
                    ? "bg-gray-600 text-white"
                    : "hover:bg-gray-400 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

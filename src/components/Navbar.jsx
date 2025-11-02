import { Search } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { Context  } from "../Context/Context";
import { Menu } from "lucide-react";

  const Navbar = ({toggleSidebar}) => {
  const { searchTerm, setSearchTerm } = useContext(Context);

  return (
  <>
  

      <nav className="flex flex-wrap relative flex-col items-center justify-between bg-white shadow-md px-4 md:px-6 py-3 transition-colors duration-300 ">
       <div className="flex flex-row-reverse items-center justify-between w-full">
        <div className="flex items-center  gap-3 md:mt-0 ">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600"
        />
      </div>

     <div className="flex items-center gap-3 ">
        {/* Hamburger visible only on small screens */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
   
      </div>
       </div>


       {/* Center - search bar */}
      <div className="flex items-center  md:absolute md:ml-15 border border-gray-400 overflow-hidden w-full rounded-lg md:w-1/2  mt-3 md:mt-0 ">
        <Search className="text-gray-600 ml-3" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none w-full text-sm px-3 py-2 text-gray-900 placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // ✅ updates context
        />
      </div>

    </nav>

  </>
  );
};

export default Navbar;

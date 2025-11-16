import { createContext, useEffect, useState } from "react";
import productsData from "../../product.json";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState(productsData);
    
  // const backendUrl = import.meta.env.VITE_API_URL;
  // console.log(backendUrl);
  const backendUrl = https://hedamo-backend.onrender.com";
  

     useEffect(() => {
      const fetchProducts = async ()=>{
        try {
        const res =  await fetch(`${backendUrl}/products`)
        const data = await res.json()
          
        } catch (error) {
          
        }
      }
      fetchProducts()
  }, []);

  return (
    <Context.Provider value={{ searchTerm, setSearchTerm, products, setProducts, backendUrl }}>
      {children}
    </Context.Provider>
  );
};

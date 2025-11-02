import { createContext, useEffect, useState } from "react";
import productsData from "../../product.json";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState(productsData);


     useEffect(() => {
      const fetchProducts = async ()=>{
        try {
        const res =  await fetch("http://localhost:3001/products")
        const data = await res.json()
          
        } catch (error) {
          
        }
      }
      fetchProducts()
  }, []);

  return (
    <Context.Provider value={{ searchTerm, setSearchTerm, products, setProducts }}>
      {children}
    </Context.Provider>
  );
};

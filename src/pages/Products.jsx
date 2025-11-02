import { useEffect, useState, useContext } from "react";
import { Context } from "../Context/Context";
import ProductTable from "../components/ProuductTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchTerm } = useContext(Context);

  // ✅ Load data from JSON server
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // ✅ Delete product (from server + state)
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ✅ Edit product (PATCH for partial update)
  const handleEdit = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updatedProduct = await res.json();

      const updatedProducts = products.map((p) =>
        p.id === id ? updatedProduct : p
      );

      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // ✅ Filter products by search term
  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800">Product Catalog</h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No matching products found.</p>
      ) : (
        <ProductTable
          products={filteredProducts}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Products;

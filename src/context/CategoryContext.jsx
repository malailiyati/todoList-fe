import React, { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const json = await res.json();
      if (json.success) setCategories(json.data);
      else message.error(json.error || "Failed to load categories");
    } catch {
      message.error("Failed to load categories");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function UseCategories() {
  return useContext(CategoryContext);
}

export default CategoryContext;

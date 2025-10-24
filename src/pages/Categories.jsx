import React, { useState } from "react";
import { Button, message } from "antd";
import { UseCategories } from "../context/CategoryContext";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

function Categories() {
  const { categories, fetchCategories } = UseCategories();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function handleDelete(id) {
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      message.success(json.message || "Deleted");
      fetchCategories();
    } else message.error(json.error || "Failed");
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      <CategoryList
        data={categories}
        onEdit={(cat) => {
          setEditing(cat);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />
      <CategoryForm
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
      />
    </>
  );
}

export default Categories;

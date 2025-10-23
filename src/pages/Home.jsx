import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { UseTodos } from "../context/TodoContext";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

function Home() {
  const { fetchTodos } = UseTodos();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      message.success(json.message || "Deleted");
      fetchTodos();
    } else message.error(json.error || "Failed to delete");
  }

  async function handleToggle(id) {
    const res = await fetch(`/api/todos/${id}/complete`, { method: "PATCH" });
    const json = await res.json();
    if (json.success) {
      message.success(json.message || "Updated");
      fetchTodos();
    } else message.error(json.error || "Toggle failed");
  }

  return (
    <>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Input.Search
          placeholder="Search todos..."
          onSearch={(val) => fetchTodos(1, val)}
          style={{ width: 320 }}
        />
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Todo
        </Button>
      </div>

      <TodoList
        onEdit={(todo) => {
          setEditing(todo);
          setOpen(true);
        }}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
      <TodoForm open={open} onClose={() => setOpen(false)} editing={editing} />
    </>
  );
}

export default Home;

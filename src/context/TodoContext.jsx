import React, { createContext, useContext, useState } from "react";
import { message } from "antd";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchTodos(page = 1, search = "") {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/todos?page=${page}&search=${encodeURIComponent(search)}`
      );
      const json = await res.json();
      if (json.success) {
        setTodos(json.data.todos);
        setPagination(json.data.pagination);
      } else {
        message.error(json.error || "Failed to load todos");
      }
    } catch {
      message.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TodoContext.Provider
      value={{ todos, pagination, loading, fetchTodos, setTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function UseTodos() {
  return useContext(TodoContext);
}

export default TodoContext;

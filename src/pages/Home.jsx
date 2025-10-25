import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  message,
  Modal,
  Tag,
  Typography,
  Divider,
  Space,
} from "antd";
import { UseTodos } from "../context/TodoContext";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { useSearchParams } from "react-router-dom";
import {
  CalendarOutlined,
  FlagOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";

const { Text, Title } = Typography;

function Home() {
  const { setTodos, fetchTodos, pagination } = UseTodos();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const query = searchParams.get("search") || "";
    fetchTodos(1, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleDelete(id) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      message.success(json.message || "Deleted");
      fetchTodos();
    } else message.error(json.error || "Failed to delete");
  }

  async function handleToggle(id) {
    setTodos((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      return updated.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    });

    const res = await fetch(`/api/todos/${id}/complete`, { method: "PATCH" });
    const json = await res.json();

    if (!json.success) {
      message.error(json.error || "Toggle failed");
      fetchTodos();
    }
  }

  function handleView(todo) {
    setSelectedTodo(todo);
    setOpenDetail(true);
  }

  return (
    <>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Input.Search
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={(val) => {
            if (val) {
              setSearchParams({ search: val });
            } else {
              setSearchParams({});
            }
          }}
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
        onView={handleView}
      />

      <Pagination
        current={pagination.current_page || 1}
        total={pagination.total || 0}
        pageSize={pagination.per_page || 10}
        onChange={(page) => fetchTodos(page, search)}
        showSizeChanger={false}
        style={{ marginTop: 24, textAlign: "center" }}
      />

      <TodoForm open={open} onClose={() => setOpen(false)} editing={editing} />

      <Modal
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
        footer={null}
        centered
        width={520}
        closable
        bodyStyle={{
          background: "#fafafa",
          borderRadius: 12,
          padding: "24px 28px",
        }}
      >
        {selectedTodo ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "24px 28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Title
                level={4}
                style={{
                  marginBottom: 0,
                  color: "#1f1f1f",
                  fontWeight: 600,
                }}
              >
                {selectedTodo.title}
              </Title>
              <Tag
                color={selectedTodo.completed ? "green" : "volcano"}
                style={{
                  alignSelf: "flex-start",
                  fontWeight: 500,
                  borderRadius: 6,
                  padding: "2px 10px",
                }}
              >
                {selectedTodo.completed ? "Done" : "Pending"}
              </Tag>
            </Space>

            <Divider style={{ margin: "16px 0" }} />

            <div style={{ marginBottom: 16 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                {selectedTodo.description || "No description available"}
              </Text>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FlagOutlined />
                <Text strong>Priority:</Text>
                <Tag
                  color={
                    selectedTodo.priority === "high"
                      ? "red"
                      : selectedTodo.priority === "medium"
                      ? "gold"
                      : "green"
                  }
                  style={{ fontWeight: 500, borderRadius: 6 }}
                >
                  {selectedTodo.priority || "N/A"}
                </Tag>
              </div>

              {selectedTodo.category && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FolderOutlined />
                  <Text strong>Category:</Text>
                  <Tag
                    color={selectedTodo.category.color}
                    style={{ fontWeight: 500, borderRadius: 6 }}
                  >
                    {selectedTodo.category.name}
                  </Tag>
                </div>
              )}

              {selectedTodo.due_date && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CalendarOutlined />
                  <Text strong>Due Date:</Text>
                  <Text>
                    {new Date(selectedTodo.due_date).toLocaleDateString()}
                  </Text>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>No data</p>
        )}
      </Modal>
    </>
  );
}

export default Home;

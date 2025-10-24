import React from "react";
import {
  Card,
  Tag,
  Space,
  Button,
  Typography,
  Popconfirm,
  Checkbox,
  Grid,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UseTodos } from "../context/TodoContext";

const { Text, Paragraph } = Typography;

function TodoList({ onEdit, onDelete, onToggle, onView }) {
  const { todos, loading } = UseTodos();
  const screens = Grid.useBreakpoint();

  let columns = "1fr";
  if (screens.sm && !screens.md) columns = "repeat(2, 1fr)";
  if (screens.lg) columns = "repeat(3, 1fr)";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap: 20,
        padding: "0 16px",
      }}
    >
      {todos.map((todo) => (
        <Card
          key={todo.id}
          hoverable
          loading={loading}
          style={{
            borderRadius: 12,
            border: "1px solid #f0f0f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            borderTop: `5px solid ${todo.category?.color || "#ccc"}`,
            backgroundColor: todo.completed ? "#f5f5f5" : "#fff",
            opacity: todo.completed ? 0.7 : 1,
            transition: "all 0.3s ease",
          }}
          bodyStyle={{ padding: "18px 20px" }}
          onClick={(e) => {
            const tag = e.target.tagName.toLowerCase();
            if (["button", "svg", "path", "input", "span"].includes(tag))
              return;
            onView(todo);
          }}
        >
          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                strong
                style={{
                  fontSize: 16,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#888" : "#000",
                }}
              >
                {todo.title}
              </Text>
              <Checkbox
                checked={todo.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggle(todo.id);
                }}
              />
            </div>

            <Paragraph
              ellipsis={{ rows: 2 }}
              type="secondary"
              style={{
                marginBottom: 4,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.description || "No description"}
            </Paragraph>

            <Space wrap size={[4, 4]}>
              {todo.priority && (
                <Tag
                  color={
                    todo.priority === "high"
                      ? "red"
                      : todo.priority === "medium"
                      ? "gold"
                      : "green"
                  }
                >
                  {todo.priority}
                </Tag>
              )}
              <Tag color={todo.completed ? "green" : "volcano"}>
                {todo.completed ? "Done" : "Pending"}
              </Tag>
              {todo.category && (
                <Tag color={todo.category.color}>{todo.category.name}</Tag>
              )}
            </Space>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 8,
                gap: 8,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="middle"
                onClick={() => onEdit(todo)}
              />
              <Popconfirm
                title="Delete this todo?"
                onConfirm={() => onDelete(todo.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />} size="middle" />
              </Popconfirm>
            </div>
          </Space>
        </Card>
      ))}
    </div>
  );
}

export default TodoList;

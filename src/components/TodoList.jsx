import React from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  Grid,
  Typography,
  Checkbox,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UseTodos } from "../context/TodoContext";

const { Text } = Typography;

function TodoList({ onEdit, onDelete, onToggle }) {
  const { todos, pagination, loading, fetchTodos } = UseTodos();
  const screens = Grid.useBreakpoint();

  const columns = [
    {
      title: "",
      key: "checkbox",
      width: 60,
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={record.completed}
          onChange={() => onToggle(record.id)}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Text
          strong
          style={{
            textDecoration: record.completed ? "line-through" : "none",
            opacity: record.completed ? 0.6 : 1,
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
      render: (desc, record) => (
        <Text
          type="secondary"
          style={{
            textDecoration: record.completed ? "line-through" : "none",
            opacity: record.completed ? 0.6 : 1,
          }}
        >
          {desc || "-"}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      align: "center",
      render: (completed) => (
        <Tag color={completed ? "green" : "volcano"}>
          {completed ? "Done" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      responsive: ["sm"],
      render: (p) =>
        p ? (
          <Tag color={p === "high" ? "red" : p === "medium" ? "gold" : "green"}>
            {p}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: screens.xs ? 120 : 160,
      render: (_, record) => (
        <Space
          size={screens.xs ? "small" : "middle"}
          wrap
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="primary"
            icon={<EditOutlined />}
            size={screens.xs ? "small" : "middle"}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Delete this todo?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size={screens.xs ? "small" : "middle"}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={todos}
        loading={loading}
        pagination={{
          current: pagination.current_page,
          total: pagination.total,
          pageSize: pagination.per_page,
          onChange: (page) => fetchTodos(page),
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}

export default TodoList;

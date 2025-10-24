import React from "react";
import { Table, Button, Popconfirm } from "antd";

function CategoryList({ data, onEdit, onDelete }) {
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Color", dataIndex: "color" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this category?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table rowKey="id" dataSource={data} columns={columns} pagination={false} />
  );
}

export default CategoryList;

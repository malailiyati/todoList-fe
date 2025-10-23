import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { UseCategories } from "../context/CategoryContext";
import { UseTodos } from "../context/TodoContext";

function TodoForm({ open, onClose, editing }) {
  const [form] = Form.useForm();
  const { categories } = UseCategories();
  const { fetchTodos } = UseTodos();

  useEffect(() => {
    if (editing) form.setFieldsValue(editing);
    else form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  async function handleSubmit(values) {
    const method = editing ? "PATCH" : "POST";
    const url = editing ? `/api/todos/${editing.id}` : "/api/todos";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        message.success(json.message || "Saved");
        fetchTodos();
        onClose();
      } else message.error(json.error || "Failed");
    } catch {
      message.error("Failed to save todo");
    }
  }

  return (
    <Modal
      title={editing ? "Edit Todo" : "Add Todo"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="category_id" label="Category">
          <Select allowClear placeholder="Select category">
            {categories.map((c) => (
              <Select.Option key={c.id} value={c.id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="priority" label="Priority">
          <Select allowClear placeholder="Select priority">
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TodoForm;

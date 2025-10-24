import React, { useEffect } from "react";
import { Modal, Form, Input, message, ColorPicker } from "antd";
import { UseCategories } from "../context/CategoryContext";

function CategoryForm({ open, onClose, editing }) {
  const [form] = Form.useForm();
  const { fetchCategories, categories } = UseCategories();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        color: editing.color || "#1890ff",
      });
    } else {
      form.resetFields();
    }
  }, [editing, form]);

  async function handleSubmit(values) {
    const method = editing ? "PATCH" : "POST";
    const url = editing ? `/api/categories/${editing.id}` : "/api/categories";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const json = await res.json();
    if (json.success) {
      message.success(json.message || "Saved");
      fetchCategories();
      onClose();
    } else message.error(json.error || "Failed");
  }

  return (
    <Modal
      title={editing ? "Edit Category" : "Add Category"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={
            !editing
              ? [
                  { required: true, message: "Please enter category name" },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const exists = categories?.some(
                        (c) =>
                          c.name.toLowerCase() === value.toLowerCase() &&
                          c.id !== editing?.id
                      );
                      if (exists) {
                        return Promise.reject("Category name already exists");
                      }
                      return Promise.resolve();
                    },
                  },
                ]
              : [
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const exists = categories?.some(
                        (c) =>
                          c.name.toLowerCase() === value.toLowerCase() &&
                          c.id !== editing?.id
                      );
                      if (exists) {
                        return Promise.reject("Category name already exists");
                      }
                      return Promise.resolve();
                    },
                  },
                ]
          }
        >
          <Input placeholder="Category name" />
        </Form.Item>

        <Form.Item
          name="color"
          label="Color"
          rules={
            !editing
              ? [{ required: true, message: "Please choose a color" }]
              : []
          }
        >
          <ColorPicker
            showText
            defaultValue="#1890ff"
            onChangeComplete={(color) =>
              form.setFieldsValue({ color: color.toHexString() })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryForm;

import { requestApi } from "@/utils";
import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";

export default function FormUserAdd({ isOpen, onCancel, getUsers }) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleSubmit = async (values) => {
    const response = await requestApi({
      method: "post",
      endpoint: "/register",
      body: values,
      setLoading: (bool) => setIsSubmitLoading(bool),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      getUsers();
      onCancel();
    }
  };

  return (
    <Modal
      title="Tambah User"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      closable
      centered
    >
      <Form
        id="addForm"
        preserve={false}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          style={{ marginBottom: 20, marginTop: 30 }}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="Masukkan Nama" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          style={{ marginBottom: 20 }}
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input placeholder="Masukkan Nomor Telepon" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          style={{ marginBottom: 40 }}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" placeholder="Masukkan Email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitLoading} block>
            SIMPAN
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

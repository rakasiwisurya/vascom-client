import { requestApi } from "@/utils";
import { Button, Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function FormUserEdit({ id, isOpen, onCancel, getUsers }) {
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (id) getUser();
  }, [id]);

  const getUser = async () => {
    const response = await requestApi({
      method: "get",
      endpoint: `/users/${id}`,
      setLoading: (bool) => setIsDetailLoading(bool),
    });

    if (response) setUser(response.data.data);
  };

  const handleSubmit = async (values) => {
    const response = await requestApi({
      method: "put",
      endpoint: `/users/${id}`,
      body: values,
      setLoading: (bool) => setIsSubmitLoading(bool),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      getUsers();
      onCancel();
    }
  };

  if (isDetailLoading) {
    return (
      <Modal title="Edit User" open={isOpen} onCancel={onCancel} footer={null} closable centered>
        <Loading />
      </Modal>
    );
  }

  return (
    <Modal
      title="Edit User"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      closable
      centered
    >
      <Form
        id="editForm"
        preserve={false}
        layout="vertical"
        requiredMark={false}
        initialValues={user}
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

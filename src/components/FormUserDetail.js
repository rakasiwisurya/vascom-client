import { requestApi } from "@/utils";
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function FormUserDetail({ id, isOpen, onCancel }) {
  const [isDetailLoading, setIsDetailLoading] = useState(true);
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

  if (isDetailLoading) {
    return (
      <Modal title="Detail User" open={isOpen} onCancel={onCancel} footer={null} closable centered>
        <Loading />
      </Modal>
    );
  }

  return (
    <Modal title="Detail User" open={isOpen} onCancel={onCancel} footer={null} closable centered>
      <Form
        id="detailForm"
        preserve={false}
        layout="vertical"
        requiredMark={false}
        initialValues={user}
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
          <Input placeholder="Masukkan Nama" disabled />
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
          <Input placeholder="Masukkan Nomor Telepon" disabled />
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
          <Input type="email" placeholder="Masukkan Email" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
}

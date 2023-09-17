import { setUser } from "@/redux";
import { requestApi, webStorage } from "@/utils";
import { Button, Form, Input, Modal, notification } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function HomeFormLogin({ isOpen, onCancel }) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const response = await requestApi({
      method: "post",
      endpoint: "/login",
      body: values,
      setLoading: (bool) => setIsSubmitLoading(bool),
    });

    if (response) {
      dispatch(setUser({ user: response.data.data }));
      webStorage.set("user", response.data.data);
      Cookies.set("user", JSON.stringify(response.data.data), {
        secure: process.env.NODE_ENV === "production",
      });
      notification.success({ message: "Success", description: response.data.message });
      onCancel();
    }
  };

  return (
    <Modal
      title="Login"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      closable
      centered
    >
      <Form
        id="loginForm"
        preserve={false}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          label="Email atau Nomor Telepon"
          style={{ marginBottom: 20, marginTop: 30 }}
          rules={[
            {
              required: true,
              message: "Please input your email or phone!",
            },
          ]}
        >
          <Input placeholder="Masukkan Email atau Nomor Telepon" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          style={{ marginBottom: 40 }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Masukkan Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitLoading} block>
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

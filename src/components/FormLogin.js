import { setUser } from "@/redux";
import { requestApi, webStorage } from "@/utils";
import { Button, Form, Input, Typography, notification } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function FormLogin() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const response = await requestApi({
      method: "post",
      endpoint: "/login",
      body: { ...values, isAdmin: true },
      setLoading: (bool) => setIsLoginLoading(bool),
    });

    if (response) {
      dispatch(setUser({ user: response.data.data }));
      webStorage.set("user", response.data.data);
      Cookies.set("user", JSON.stringify(response.data.data), {
        secure: process.env.NODE_ENV === "production",
      });
      notification.success({ message: "Success", description: response.data.message });
    }
  };

  return (
    <div className="login-form">
      <Form
        name="login"
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
        style={{ maxWidth: 400 }}
      >
        <div className="login-form-title-container">
          <Typography.Title style={{ fontSize: 22 }}>Selamat Datang Admin</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 13 }}>
            Silahkan masukkan email atau nomor telepon dan password Anda untuk mulai menggunakan
            aplikasi
          </Typography.Paragraph>
        </div>

        <Form.Item name="username" label="Email / Nomor Telpon" rules={[{ required: true }]}>
          <Input placeholder="Contoh: admin@gmail.com" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Masukkan passward" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoginLoading} block>
            MASUK
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

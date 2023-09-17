import { PngLogo } from "@/assets";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Form, Input, Layout, Space, Typography } from "antd";
import Image from "next/image";
import Logout from "./Logout";
import Profile from "./Profile";
import { useSelector } from "react-redux";

const { Header } = Layout;
const { Text } = Typography;

const items = [
  {
    label: <Profile />,
  },
  {
    type: "divider",
  },
  {
    label: <Logout />,
    danger: true,
  },
];

export default function HomeHeader({ onLoginClick, onRegisterClick, onSearch }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <Header className="home-header-container container-fluid">
      <Image src={PngLogo} alt="Vascom Logo" priority />

      <Form id="searchForm" onFinish={onSearch} style={{ width: "100%" }}>
        <Form.Item name="search" noStyle>
          <Input placeholder="Cari parfum kesukaanmu" suffix={<SearchOutlined />} allowClear />
        </Form.Item>
      </Form>

      {user ? (
        <Dropdown
          menu={{ items: items.map((item, index) => ({ ...item, key: String(index) })) }}
          trigger={["click"]}
        >
          <Button type="text" style={{ height: "100%" }}>
            <Space>
              <Space direction="vertical" align="end" size={0}>
                <Text style={{ fontSize: 12 }}>{user?.name}</Text>
              </Space>
              <Avatar />
            </Space>
          </Button>
        </Dropdown>
      ) : (
        <Space size="middle">
          <Button onClick={onLoginClick}>MASUK</Button>
          <Button type="primary" onClick={onRegisterClick}>
            DAFTAR
          </Button>
        </Space>
      )}
    </Header>
  );
}

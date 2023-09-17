import { Avatar, Space, Typography } from "antd";
import { useSelector } from "react-redux";

const { Text } = Typography;

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Space direction="vertical" align="center" style={{ width: 150 }}>
      <Avatar />
      <Space direction="vertical" size={1} align="center">
        <Text>{user?.name}</Text>
        <Text style={{ fontSize: 11 }}>{user?.email}</Text>
      </Space>
    </Space>
  );
}

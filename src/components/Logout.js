import { setUser } from "@/redux";
import { webStorage } from "@/utils";
import { PoweroffOutlined } from "@ant-design/icons";
import { Space } from "antd";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser({ user: null }));
    webStorage.clear();
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
      Cookies.remove(cookieName);
    }
  };

  return (
    <Space
      direction="vertical"
      align="center"
      size="small"
      style={{ width: "100%" }}
      onClick={handleLogout}
    >
      <Space>
        <PoweroffOutlined />
        KELUAR
      </Space>
    </Space>
  );
}

"use client";

import { Logout, Profile } from "@/components";
import { webStorage } from "@/utils";
import { Avatar, Button, Dropdown, Layout, Menu, Space, Typography } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsJournalText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "../assets/scss/globals.scss";
import { setUser } from "@/redux";

const { Header, Sider } = Layout;
const { Text } = Typography;

const menus = [
  {
    key: "/dashboard",
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <AiOutlineHome />,
  },
  {
    key: "/management-user",
    label: <Link href="/management-user">Manajemen User</Link>,
    icon: <AiOutlineUser />,
  },
  {
    key: "/management-product",
    label: <Link href="/management-product">Manajemen Produk</Link>,
    icon: <BsJournalText />,
  },
];

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

export default function Routes({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [current, setCurrent] = useState(pathname);

  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (current !== pathname) setCurrent(pathname);
  }, [current, pathname]);

  useEffect(() => {
    if (!isLoading) {
      if (user?.role === "ADMIN" && pathname === "/login") router.replace("/dashboard");
      if ((!user || user?.role !== "ADMIN") && pathname !== "/" && pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    dispatch(setUser({ user: webStorage.get("user"), isLoading: false }));
  }, []);

  return (
    <>
      {pathname === "/" || pathname === "/login" ? (
        children
      ) : (
        <Layout>
          <Sider theme="light">
            <div className="wrapper-logo">LOGO</div>
            <Menu
              theme="light"
              mode="inline"
              onSelect={(e) => setCurrent(e.key)}
              selectedKeys={[current]}
              items={menus}
            />
          </Sider>
          <Layout>
            <Header className="wrapper-header">
              <Dropdown
                menu={{ items: items.map((item, index) => ({ ...item, key: String(index) })) }}
                trigger={["click"]}
              >
                <Button type="text" style={{ height: "100%" }}>
                  <Space>
                    <Space direction="vertical" align="end" size={0}>
                      <Text style={{ fontSize: 10, color: "#41A0E4" }}>Hallo {user?.role},</Text>
                      <Text style={{ fontSize: 12 }}>{user?.name}</Text>
                    </Space>
                    <Avatar />
                  </Space>
                </Button>
              </Dropdown>
            </Header>
            {children}
          </Layout>
        </Layout>
      )}
    </>
  );
}

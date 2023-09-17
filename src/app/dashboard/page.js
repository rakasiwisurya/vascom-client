"use client";

import { NewProducts, Summary } from "@/components";
import { Typography } from "antd";

export default function Dashboard() {
  return (
    <>
      <Typography.Text className="wrapper-title">Dashboard</Typography.Text>
      <Summary />
      <NewProducts />
    </>
  );
}

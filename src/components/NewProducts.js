import { requestApi } from "@/utils";
import { Layout, Table, Typography } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";

export default function NewProducts() {
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [columns] = useState([
    {
      title: "Produk",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tanggal Dibuat",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{text ? moment(text).format("DD-MM-YYYY") : text}</div>,
    },
    {
      title: "Harga (Rp)",
      dataIndex: "price",
      key: "price",
      render: (text) => <div>{text ? text.toLocaleString() : text}</div>,
    },
  ]);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const payload = { limit: 10, page };

    const response = await requestApi({
      method: "get",
      endpoint: "/products",
      params: payload,
      setLoading: (bool) => setIsProductsLoading(bool),
    });

    if (response) {
      const { data, page, totalData } = response.data.data;

      setProducts(data);
      setPage(page);
      setTotalData(totalData);
    }
  };

  return (
    <Layout.Content className="wrapper-content">
      <Typography.Text className="wrapper-title">Produk Baru</Typography.Text>

      <Table
        className="table-striped-rows"
        rowKey="id"
        dataSource={products}
        columns={columns}
        loading={isProductsLoading}
        scroll={{ x: "max-content" }}
        bordered
        style={{ marginTop: 40 }}
        pagination={{
          current: page,
          total: totalData,
          onChange: (value) => setPage(value),
          responsive: true,
        }}
      />
    </Layout.Content>
  );
}

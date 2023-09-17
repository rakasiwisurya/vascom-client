"use client";

import {
  ButtonCustom,
  FormProductAdd,
  FormProductDetail,
  FormProductEdit,
  ModalConfirmation,
} from "@/components";
import { requestApi } from "@/utils";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Col, Image, Layout, Row, Space, Table, Tag, Typography, notification } from "antd";
import { useEffect, useState } from "react";

export default function ManagementProduct() {
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [detailId, setDetailId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState(null);
  const [columns] = useState([
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => <div>{index + 1 + (page - 1) * 10}</div>,
    },
    {
      title: "Nama",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (text) => <div>{text ? text.toLocaleString() : text}</div>,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text, record) => <Image width={100} src={text} alt={record.title} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "ACTIVE" ? "#479F77" : "#D83A56"}>
          {text === "ACTIVE" ? "AKTIF" : "TIDAK AKTIF"}
        </Tag>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <ButtonCustom
            variant="success"
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => handleDetail(record.id)}
          />

          <ButtonCustom
            variant="warning"
            shape="circle"
            icon={<FormOutlined />}
            onClick={() => handleEdit(record.id)}
          />

          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => handleConfirm(record.id, record.title)}
          />
        </Space>
      ),
    },
  ]);

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

  const handleDetail = (id) => {
    setDetailId(id);
    setIsModalDetailOpen(true);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setIsModalEditOpen(true);
  };

  const handleConfirm = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsModalDeleteOpen(true);
  };

  const handleDelete = async () => {
    const response = await requestApi({
      method: "delete",
      endpoint: `/products/${deleteId}`,
      setLoading: (bool) => setIsDeleteLoading(bool),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      setDeleteId(null);
      setDeleteName(null);
      getProducts();
      setIsModalDeleteOpen(false);
    }
  };

  return (
    <>
      <Row justify="space-between" className="wrapper-title">
        <Col>
          <Typography.Text>Manajemen Product</Typography.Text>
        </Col>

        <Col>
          <Button type="primary" onClick={() => setIsModalAddOpen(true)}>
            TAMBAH PRODUCT
          </Button>
        </Col>
      </Row>

      <Layout.Content className="wrapper-content">
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

      <FormProductAdd
        isOpen={isModalAddOpen}
        onCancel={() => setIsModalAddOpen(false)}
        getProducts={getProducts}
      />

      {detailId && (
        <FormProductDetail
          id={detailId}
          isOpen={isModalDetailOpen}
          onCancel={() => setIsModalDetailOpen(false)}
        />
      )}

      {editId && (
        <FormProductEdit
          id={editId}
          isOpen={isModalEditOpen}
          onCancel={() => setIsModalEditOpen(false)}
          getProducts={getProducts}
        />
      )}

      {deleteId && deleteName && (
        <ModalConfirmation
          title="Konfirmasi Hapus"
          message={`Apakah kamu yakin menghapus ${deleteName}?`}
          open={isModalDeleteOpen}
          onCancel={() => setIsModalDeleteOpen(false)}
          cancelText="Batal"
          onSuccess={handleDelete}
          successText="Hapus"
          successLoading={isDeleteLoading}
        />
      )}
    </>
  );
}

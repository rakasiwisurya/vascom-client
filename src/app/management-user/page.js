"use client";

import {
  ButtonCustom,
  FormUserAdd,
  FormUserDetail,
  FormUserEdit,
  ModalConfirmation,
} from "@/components";
import { requestApi } from "@/utils";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Space, Table, Tag, Typography, notification } from "antd";
import { useEffect, useState } from "react";

export default function ManagementUser() {
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [users, setUsers] = useState([]);
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
      title: "Nama Lengkap",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "No. Telepon",
      dataIndex: "phone",
      key: "phone",
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
            onClick={() => handleConfirm(record.id, record.name)}
          />
        </Space>
      ),
    },
  ]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const payload = { limit: 10, page };

    const response = await requestApi({
      method: "get",
      endpoint: "/users",
      params: payload,
      setLoading: (bool) => setIsUsersLoading(bool),
    });

    if (response) {
      const { data, page, totalData } = response.data.data;

      setUsers(data);
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
      endpoint: `/users/${deleteId}`,
      setLoading: (bool) => setIsDeleteLoading(bool),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      setDeleteId(null);
      setDeleteName(null);
      getUsers();
      setIsModalDeleteOpen(false);
    }
  };

  return (
    <>
      <Row justify="space-between" className="wrapper-title">
        <Col>
          <Typography.Text>Manajemen User</Typography.Text>
        </Col>

        <Col>
          <Button type="primary" onClick={() => setIsModalAddOpen(true)}>
            TAMBAH USER
          </Button>
        </Col>
      </Row>

      <Layout.Content className="wrapper-content">
        <Table
          className="table-striped-rows"
          rowKey="id"
          dataSource={users}
          columns={columns}
          loading={isUsersLoading}
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

      <FormUserAdd
        isOpen={isModalAddOpen}
        onCancel={() => setIsModalAddOpen(false)}
        getUsers={getUsers}
      />

      {detailId && (
        <FormUserDetail
          id={detailId}
          isOpen={isModalDetailOpen}
          onCancel={() => setIsModalDetailOpen(false)}
        />
      )}

      {editId && (
        <FormUserEdit
          id={editId}
          isOpen={isModalEditOpen}
          onCancel={() => setIsModalEditOpen(false)}
          getUsers={getUsers}
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

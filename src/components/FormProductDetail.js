import { requestApi } from "@/utils";
import { Form, Image, Input, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function FormProductDetail({ id, isOpen, onCancel }) {
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  const getProduct = async () => {
    const response = await requestApi({
      method: "get",
      endpoint: `/products/${id}`,
      setLoading: (bool) => setIsDetailLoading(bool),
    });

    if (response) setProduct(response.data.data);
  };

  if (isDetailLoading) {
    return (
      <Modal
        title="Detail Product"
        open={isOpen}
        onCancel={onCancel}
        footer={null}
        closable
        centered
      >
        <Loading />
      </Modal>
    );
  }

  return (
    <Modal title="Detail Product" open={isOpen} onCancel={onCancel} footer={null} closable centered>
      <Form
        id="addForm"
        preserve={false}
        layout="vertical"
        requiredMark={false}
        initialValues={product}
      >
        <Form.Item
          name="title"
          label="Nama"
          style={{ marginBottom: 20, marginTop: 30 }}
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input placeholder="Masukkan Nama Produk" disabled />
        </Form.Item>

        <Form.Item
          name="price"
          label="Harga"
          style={{ marginBottom: 20 }}
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <InputNumber
            placeholder="Masukkan Harga"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
            disabled
          />
        </Form.Item>

        <div>{product.photo && <Image width="100%" src={product.photo} />}</div>
      </Form>
    </Modal>
  );
}

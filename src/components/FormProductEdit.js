import { requestApi } from "@/utils";
import { PictureOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, InputNumber, Modal, Upload, notification } from "antd";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function FormProductEdit({ id, isOpen, onCancel, getProducts }) {
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setPreviewFile(null);
    }
  }, [isOpen]);

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

  const handleUpload = (file) => {
    setFile(file);
    setPreviewFile(URL.createObjectURL(file));
    return false;
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewFile(null);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.set("title", values.title);
    formData.set("price", values.price);
    formData.set("photo", file);

    const response = await requestApi({
      contentType: "formData",
      method: "put",
      endpoint: `/products/${id}`,
      body: formData,
      setLoading: (bool) => setIsSubmitLoading(bool),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      getProducts();
      onCancel();
    }
  };

  if (isDetailLoading) {
    return (
      <Modal title="Edit Product" open={isOpen} onCancel={onCancel} footer={null} closable centered>
        <Loading />
      </Modal>
    );
  }

  return (
    <Modal
      title="Edit Product"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      closable
      centered
    >
      <Form
        id="editForm"
        preserve={false}
        layout="vertical"
        requiredMark={false}
        initialValues={product}
        onFinish={handleSubmit}
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
          <Input placeholder="Masukkan Nama Produk" />
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
          />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Gambar Produk"
          style={{ marginBottom: 20 }}
          rules={[
            {
              required: true,
              message: "Please input your product image!",
            },
          ]}
        >
          <Upload.Dragger
            name="photo"
            beforeUpload={handleUpload}
            fileList={file ? [file] : []}
            onRemove={handleRemove}
          >
            <p className="ant-upload-drag-icon">
              <PictureOutlined />
            </p>

            <p className="ant-upload-hint">Pilih gambar dengan ratio 9:16.</p>
          </Upload.Dragger>
        </Form.Item>

        <div style={{ marginBottom: 40 }}>
          {(previewFile || product.photo) && (
            <Image width="100%" src={previewFile || product.photo} />
          )}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitLoading} block>
            SIMPAN
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

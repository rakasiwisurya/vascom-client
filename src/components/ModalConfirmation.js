import { Modal } from "antd";

export default function ModalConfirmation({
  title,
  message,
  open,
  onCancel,
  cancelText,
  onSuccess,
  successText,
  successButtonProps,
  successLoading,
}) {
  return (
    <Modal
      title={title}
      onCancel={onCancel}
      cancelText={cancelText}
      okText={successText}
      open={open}
      centered
      onOk={onSuccess}
      okButtonProps={successButtonProps}
      confirmLoading={successLoading}
    >
      {message}
    </Modal>
  );
}

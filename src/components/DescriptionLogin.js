import { Space, Typography } from "antd";

export default function DescriptionLogin() {
  return (
    <Space direction="vertical" size="middle" className="login-description">
      <Typography.Title style={{ fontWeight: "bold" }}>VASCOM</Typography.Title>

      <Typography.Paragraph style={{ textAlign: "center", fontSize: 12, width: 350 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book.
      </Typography.Paragraph>
    </Space>
  );
}

import { Spin } from "antd";

export default function Loading({ size, tip, delay, style }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        ...style,
      }}
    >
      <Spin size={size} tip={tip} delay={delay} />
    </div>
  );
}

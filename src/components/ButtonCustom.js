import { Button } from "antd";

export default function ButtonCustom({ children, variant, ...rest }) {
  if (variant === "success") {
    return (
      <Button {...rest} type="primary" className="btn-success">
        {children}
      </Button>
    );
  }

  if (variant === "warning") {
    return (
      <Button {...rest} type="primary" className="btn-warning">
        {children}
      </Button>
    );
  }

  return (
    <Button {...rest} type="primary">
      {children}
    </Button>
  );
}

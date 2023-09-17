import { requestApi } from "@/utils";
import { Col, Row, Skeleton, Space, Typography } from "antd";
import { useEffect, useState } from "react";

export default function Summary() {
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    const response = await requestApi({
      method: "get",
      endpoint: "/dashboard",
      setLoading: (bool) => setIsSummaryLoading(bool),
    });

    if (response) setSummary(response.data.data);
  };

  return (
    <div style={{ margin: "24px 16px 0" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Space direction="vertical" className="summaries">
            <Typography.Text>Jumlah User</Typography.Text>
            <Space>
              {isSummaryLoading ? (
                <Skeleton.Input block />
              ) : (
                <>
                  <Typography.Text>{summary.users}</Typography.Text>
                  <Typography.Text>User</Typography.Text>
                </>
              )}
            </Space>
          </Space>
        </Col>

        <Col xs={24} md={6}>
          <Space direction="vertical" className="summaries">
            <Typography.Text>Jumlah User Aktif</Typography.Text>
            <Space>
              {isSummaryLoading ? (
                <Skeleton.Input block />
              ) : (
                <>
                  <Typography.Text>{summary.activeUsers}</Typography.Text>
                  <Typography.Text>User</Typography.Text>
                </>
              )}
            </Space>
          </Space>
        </Col>

        <Col xs={24} md={6}>
          <Space direction="vertical" className="summaries">
            <Typography.Text>Jumlah Produk</Typography.Text>
            <Space>
              {isSummaryLoading ? (
                <Skeleton.Input block />
              ) : (
                <>
                  <Typography.Text>{summary.products}</Typography.Text>
                  <Typography.Text>Produk</Typography.Text>
                </>
              )}
            </Space>
          </Space>
        </Col>

        <Col xs={24} md={6}>
          <Space direction="vertical" className="summaries">
            <Typography.Text>Jumlah Produk Aktif</Typography.Text>
            <Space>
              {isSummaryLoading ? (
                <Skeleton.Input block />
              ) : (
                <>
                  <Typography.Text>{summary.activeProducts}</Typography.Text>
                  <Typography.Text>Produk</Typography.Text>
                </>
              )}
            </Space>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

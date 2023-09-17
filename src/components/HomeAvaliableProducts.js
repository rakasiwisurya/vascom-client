import { Button, Card, Col, Empty, Image, Row, Space, Typography } from "antd";
import Loading from "./Loading";

export default function HomeAvaliableProducts({ data, isLoading, isLoadMore, onLoadMore }) {
  return (
    <>
      <Typography.Title style={{ fontSize: 26 }}>Tersedia</Typography.Title>

      {isLoading ? (
        <Loading style={{ margin: "20px 0" }} />
      ) : (
        <div style={{ margin: "20px 0" }}>
          {!data || data?.length <= 0 ? (
            <Empty />
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {data?.length > 0 &&
                  data.map((availableProduct, index) => (
                    <Col key={`availableProduct-${index}`} span={4.8}>
                      <Card bodyStyle={{ padding: 10, gap: 10 }} hoverable>
                        <Space direction="vertical" size={8}>
                          <Image
                            src={availableProduct.photo}
                            alt={availableProduct.title}
                            style={{ width: 183, height: 183, marginBottom: 5 }}
                          />
                          <Typography.Text style={{ fontWeight: 600 }}>
                            {availableProduct.title}
                          </Typography.Text>
                          <Typography.Text style={{ color: "#41a0e4", fontWeight: 600 }}>
                            IDR. {availableProduct.price.toLocaleString()}
                          </Typography.Text>
                        </Space>
                      </Card>
                    </Col>
                  ))}
              </Row>

              {isLoadMore && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Button onClick={onLoadMore}>Lihat lebih banyak</Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

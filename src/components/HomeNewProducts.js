import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Card, Empty, Image, Space, Typography } from "antd";
import Loading from "./Loading";

export default function HomeNewProducts({ data, isLoading }) {
  return (
    <>
      <Typography.Title style={{ fontSize: 26 }}>Terbaru</Typography.Title>

      {isLoading ? (
        <Loading style={{ margin: "20px 0" }} />
      ) : (
        <>
          {!data || data?.length <= 0 ? (
            <Empty style={{ margin: "20px 0" }} />
          ) : (
            <Swiper
              spaceBetween={16}
              slidesPerView={5}
              modules={[Navigation]}
              style={{ margin: "20px 0" }}
              navigation
            >
              {data?.length > 0 &&
                data.map((newProduct, index) => (
                  <SwiperSlide key={`banner-${index}`} style={{ padding: 10, overflow: "hidden" }}>
                    <Card style={{ width: 203 }} bodyStyle={{ padding: 10 }} hoverable>
                      <Space direction="vertical" size={8}>
                        <Image
                          src={newProduct.photo}
                          alt={newProduct.title}
                          style={{ width: 183, height: 183, marginBottom: 5 }}
                        />
                        <Typography.Text style={{ fontWeight: 600 }}>
                          {newProduct.title}
                        </Typography.Text>
                        <Typography.Text style={{ color: "#41a0e4", fontWeight: 600 }}>
                          IDR. {newProduct.price.toLocaleString()}
                        </Typography.Text>
                      </Space>
                    </Card>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </>
      )}
    </>
  );
}

import { PngBanner } from "@/assets";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const banners = [
  {
    name: "Banner 1",
    image: PngBanner,
  },
  {
    name: "Banner 2",
    image: PngBanner,
  },
  {
    name: "Banner 3",
    image: PngBanner,
  },
  {
    name: "Banner 4",
    image: PngBanner,
  },
];

export default function HomeBanner() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={`banner-${index}`}>
          <Image
            src={banner.image}
            alt={banner.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            priority
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

"use client";

import { store } from "@/redux";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "../assets/scss/globals.scss";
import Routes from "./routes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Vascom",
  description: "Generated by Rakasiwi Surya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className} style={{ fontSize: 14 }}>
        <Provider store={store}>
          <Routes>{children}</Routes>
        </Provider>
      </body>
    </html>
  );
}

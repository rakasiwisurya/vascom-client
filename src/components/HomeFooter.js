import { PngLogo } from "@/assets";
import { Col, Layout, Row, Space, Typography } from "antd";
import Image from "next/image";
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoTwitter } from "react-icons/bi";

const { Footer } = Layout;

export default function HomeFooter() {
  return (
    <Footer>
      <div className="container">
        <Row gutter={[25, 25]}>
          <Col span={7}>
            <Space direction="vertical" size={25} align="center">
              <Image src={PngLogo} alt="Vascom Logo" />

              <Typography.Paragraph
                style={{ fontSize: 14, color: "#00000040", textAlign: "center" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo in vestibulum,
                sed dapibus tristique nullam.
              </Typography.Paragraph>

              <Space size={10}>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <BiLogoFacebook color="#41a0e4" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <BiLogoTwitter color="#41a0e4" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <BiLogoInstagramAlt color="#41a0e4" />
                </a>
              </Space>
            </Space>
          </Col>

          <Col span={4} offset={3}>
            <Space direction="vertical" size={20}>
              <Typography.Title style={{ fontSize: 16 }}>Layanan</Typography.Title>
              <Space direction="vertical" size={7}>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  BANTUAN
                </Typography.Text>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  TANYA JAWAB
                </Typography.Text>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  HUBUNGI KAMI
                </Typography.Text>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  CARA BERJUALAN
                </Typography.Text>
              </Space>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical" size={20}>
              <Typography.Title style={{ fontSize: 16 }}>Tentang Kami</Typography.Title>
              <Space direction="vertical" size={7}>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  ABOUT US
                </Typography.Text>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  KARIR
                </Typography.Text>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  BLOG
                </Typography.Text>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  KEBIJAKAN PRIVASI
                </Typography.Text>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  SYARAT DAN KETENTUAN
                </Typography.Text>
              </Space>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical" size={20}>
              <Typography.Title style={{ fontSize: 16 }}>Mitra</Typography.Title>
              <Space direction="vertical" size={7}>
                <Typography.Text style={{ fontSize: 14, fontFamily: "monospace" }}>
                  SUPPLIER
                </Typography.Text>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}

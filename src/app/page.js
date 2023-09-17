"use client";

import {
  HomeAvaliableProducts,
  HomeBanner,
  HomeFooter,
  HomeFormLogin,
  HomeFormRegister,
  HomeHeader,
  HomeNewProducts,
} from "@/components";
import { requestApi } from "@/utils";
import { Layout } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isNewProductsLoading, setIsNewProductsLoading] = useState(true);
  const [isAvailableProductsLoading, setIsAvailableProductsLoading] = useState(true);
  const [isShowLoadMore, setIsShowLoadMore] = useState(true);
  const [newProducts, setNewProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [availableProductsPage, setAvailableProductsPage] = useState(1);

  useEffect(() => {
    getNewProducts();
  }, []);

  useEffect(() => {
    getAvailableProducts();
  }, [availableProductsPage]);

  const getNewProducts = async (search) => {
    const payload = { isNew: true };

    if (search) payload.search = search;

    const response = await requestApi({
      method: "get",
      endpoint: "/products",
      params: payload,
      setLoading: (bool) => setIsNewProductsLoading(bool),
    });

    if (response) setNewProducts(response.data.data.data);
  };

  const getAvailableProducts = async (search, isLoadMore) => {
    const payload = { page: availableProductsPage, limit: 10 };

    if (search) payload.search = search;

    const response = await requestApi({
      method: "get",
      endpoint: "/products",
      params: payload,
      setLoading: (bool) => setIsAvailableProductsLoading(bool),
    });

    if (response) {
      if (response.data.data.data.length <= 0) setIsShowLoadMore(false);
      if (isLoadMore) {
        setAvailableProducts((prevState) => [...prevState, ...response.data.data.data]);
      } else {
        setAvailableProducts(response.data.data.data);
      }
      setAvailableProductsPage(response.data.data.page);
    }
  };

  const handleSearch = (values) => {
    getNewProducts(values.search);
    getAvailableProducts(values.search);
  };

  return (
    <>
      <HomeHeader
        onLoginClick={() => setIsModalLoginOpen(true)}
        onRegisterClick={() => setIsModalRegisterOpen(true)}
        onSearch={handleSearch}
      />

      <Layout.Content style={{ paddingTop: 70 }} className="container">
        <HomeBanner />
        <HomeNewProducts data={newProducts} isLoading={isNewProductsLoading} />
        <HomeAvaliableProducts
          data={availableProducts}
          isLoading={isAvailableProductsLoading}
          isLoadMore={isShowLoadMore}
          onLoadMore={() => getAvailableProducts(null, true)}
        />
      </Layout.Content>

      <HomeFooter />

      <HomeFormLogin isOpen={isModalLoginOpen} onCancel={() => setIsModalLoginOpen(false)} />
      <HomeFormRegister
        isOpen={isModalRegisterOpen}
        onCancel={() => setIsModalRegisterOpen(false)}
      />
    </>
  );
}

import { notification } from "antd";
import { api } from "./api";

const queryParams = (data) => {
  return `?${Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&")}`;
};

export const requestApi = async ({
  contentType, //json or formData
  method, //get or post or put or delete or others http method
  endpoint,
  body,
  params,
  setLoading,
}) => {
  if (setLoading) setLoading(true);

  try {
    const newParams = params ? queryParams(params) : "";
    const response = await api(contentType)[method](`${endpoint}${newParams}`, body);

    if (setLoading) setLoading(false);

    return response;
  } catch (error) {
    if (setLoading) setLoading(false);
    notification.error({
      message: "Failed",
      description: error?.response?.data?.message || error.message,
    });
    return false;
  }
};

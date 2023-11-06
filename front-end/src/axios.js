import axios from "axios";

const admin = axios.create({ baseURL: "http://localhost:5000" });

export const adminRequest = ({ ...option }) => {
  admin.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "admin_Secret"
  )}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };
  return admin(option).then(onSuccess).catch(onError);
};

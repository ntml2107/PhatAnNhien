import axios from "./customized-axios";

export const fectchGetCartByUser = () => axios.get("/api/carts/cart");

export const putAddItemToCart = (data) =>
  axios.put("/api/carts/cart-item/add", data);

export const putUpdateItemQuantity = (data) =>
  axios.put("api/carts/cart-item/update-quantity", data);

export const deleteRemoveItemFromCart = (id) =>
  axios.delete(`/api/carts/cart-item/${id}`);

export const getAllPaymentMethod = () => axios.get("/api/payment-methods");

export const getAllVoucher = () => axios.get("/api/vouchers");

export const getVoucherById = (id) => axios.get("/api/vouchers/" + id);

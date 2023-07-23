import axios from "axios";

const EXPIRATION_TIME = 3600 * 1000;

export const setTokenTimestamp = () => localStorage.setItem('token_timestamp', Date.now());

export const checkAccessTokenState = () => {
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    localStorage.clear();
  }
}

const getLocalAccessToken = () => localStorage.getItem('access_token') !== 'undefined' ? localStorage.getItem('access_token') : localStorage.clear(); 
const getTokenTimestamp = () => localStorage.getItem('token_timestamp');

export const getAccessToken = () => {
  const localAccessToken = getLocalAccessToken();

  return localAccessToken;
};

export const token = getAccessToken();

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

export const getUser = () => localStorage.getItem('user') !== 'undefined' ? localStorage.getItem('user') : localStorage.clear();

// api calls

// admin access routes 
export const createUser = (props) => axios.post('/api/v1/admin/signup', props, { headers });
export const getAllUser = (page, limit, type) => axios.get(`/api/v1/admin/users?page=${page}&limit=${limit}&userType=${type}`, { headers });
export const editUser = (props) => axios.put('/api/v1/admin/editUser', props, { headers });
export const getRequestedUser = (userId) => axios.get(`/api/v1/admin/getUser?userId=${userId}`, { headers });

// dashboard data
export const getNumberOfActiveUsers = () => axios.get('/api/v1/admin/getActiveUsers', { headers });
export const getNumberofCancelledOrders = () => axios.get('/api/v1/admin/cancelOrder', { headers });
export const getNumberofActiveOrders = () => axios.get('/api/v1/admin/orders', { headers });
export const getTotalRevenue = () => axios.get('/api/v1/admin/totalRevenue', { headers });

// shopping items
export const addShoppingItem = (props) => axios.post('/api/v1/admin/createShoppingItem', props, { headers });
export const getAllShoppingItems = (category) => axios.get(`/api/v1/admin/getShoppingItems?categoryId=${category}`);
export const getShoppingItemDetails = (productId) => axios.get(`/api/v1/admin/getShoppingItemsDetails?productId=${productId}`);
export const addReview = (props) => axios.post('/api/v1/admin/product/addReview', props, { headers });
export const getAllProducts = (page, limit) => axios.get(`/api/v1/products?page=${page}&limit=${limit}`, { headers });
export const getRequestedProduct = (productId) => axios.get(`/api/v1/admin/getProduct?productId=${productId}`, { headers });
export const editProduct = (props) => axios.put('/api/v1/admin/editProduct', props, { headers });

//orders
export const placeOrder = (props) => axios.post('/api/v1/placeOrder', props, { headers });
export const getOrders = (orderId) => axios.get(`/api/v1/getOrders?orderId=${orderId}`, { headers });
export const getAllUserOrders = (userId) => axios.get(`/api/v1/getAllOrders?userId=${userId}`, { headers });
export const getAllOrders = (page, limit) => axios.get(`/api/v1/admin/getOrders?page=${page}&limit=${limit}`, { headers });
export const cancelOrder = (orderId) => axios.delete(`/api/v1/cancelOrder?orderId=${orderId}`, { headers });
export const updateOrderStatus = (orderId, newStatus) => axios.delete(`/api/v1/updateOrderStatus?orderId=${orderId}&newStatus=${newStatus}`, { headers });

// wishlist
export const saveToWishList = (props) => axios.post('/api/v1/saveToWishList', props, { headers });
export const getWishList = (userId) => axios.get(`/api/v1/getWishList?userId=${userId}`, { headers });
export const removeFromWishList = (props) => axios.put('/api/v1/removeFromWishList', props, { headers });

//user
export const getUserDetails = () => axios.get('/api/v1/user', { headers });
export const updateUserDetails = (props) => axios.put('/api/v1/updateUser', props, { headers });
export const deleteUser = (userId) => axios.delete(`/api/v1/deleteUser?userId=${userId}`, { headers });

//sales
export const getSales = () => axios.get('/api/v1/admin/sales', { headers });
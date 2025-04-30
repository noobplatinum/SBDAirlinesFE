import axios from 'axios';

const API_URL = 'https://cs9-jesayadavidgnp-be.vercel.app/store/getAll'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const userService = {
  register: (name, email, password) => api.post('/user/register', {}, { params: { name, email, password } }),
  login: (email, password) => api.post('/user/login', {}, { params: { email, password } }),
  topUp: (id, amount) => api.post('/user/topUp', {}, { params: { id, amount } }),
  getUserByEmail: (email) => api.get(`/user/${email}`),
  updateUser: (userData) => api.put('/user', userData)
};

export const storeService = {
  getAllStores: () => api.get('/store/getAll'),
  getStoreById: (id) => api.get(`/store/${id}`),
  createStore: (storeData) => api.post('/store/create', storeData),
  updateStore: (storeData) => api.put('/store', storeData),
  deleteStore: (id) => api.delete(`/store/${id}`)
};

export const itemService = {
  getAllItems: () => api.get('/item'),
  getItemById: (id) => api.get(`/item/byId/${id}`),
  getItemsByStoreId: (storeId) => api.get(`/item/byStoreId/${storeId}`),
  createItem: (itemData) => {
    const formData = new FormData();
    for (const key in itemData) {
      if (key === 'image') {
        formData.append('image', itemData.image);
      } else {
        formData.append(key, itemData[key]);
      }
    }
    return api.post('/item/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateItem: (itemData) => {
    const formData = new FormData();
    for (const key in itemData) {
      if (key === 'image') {
        formData.append('image', itemData.image);
      } else {
        formData.append(key, itemData[key]);
      }
    }
    return api.put('/item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  deleteItem: (id) => api.delete(`/item/${id}`)
};

export const transactionService = {
  getAllTransactions: () => api.get('/transaction'),
  createTransaction: (transactionData) => api.post('/transaction/create', transactionData),
  payTransaction: (id) => api.post(`/transaction/pay/${id}`),
  deleteTransaction: (id) => api.delete(`/transaction/${id}`)
};


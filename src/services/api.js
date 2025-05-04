import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const uploadApi = axios.create({
  baseURL: API_URL
});

export const userService = {
  register: (name, email, password) => api.post('/user/register', { name, email, password }),
  login: (email, password) => api.post('/user/login', { email, password }),
  getUserById: (id) => api.get(`/user/${id}`),
  updateUserProfile: (userData) => api.put('/user', userData),
  deleteUserAccount: (id) => api.delete(`/user/${id}`)
};

export const noteService = {
  createNote: (noteData, imageFile) => {
    if (imageFile) {
      const formData = new FormData();
      
      Object.keys(noteData).forEach(key => {
        if (Array.isArray(noteData[key])) {
          noteData[key].forEach(value => formData.append(`${key}[]`, value));
        } else {
          formData.append(key, noteData[key]);
        }
      });
      
      formData.append('image', imageFile);
      
      return uploadApi.post('/note/create', formData);
    } else {
      return api.post('/note/create', noteData);
    }
  },
  
  updateNote: (noteData, imageFile, removeImage = false) => {
    if (imageFile || removeImage) {
      const formData = new FormData();
      
      Object.keys(noteData).forEach(key => {
        if (Array.isArray(noteData[key])) {
          noteData[key].forEach(value => formData.append(`${key}[]`, value));
        } else {
          formData.append(key, noteData[key]);
        }
      });
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      if (removeImage) {
        formData.append('remove_image', 'true');
      }
      
      return uploadApi.put('/note', formData);
    } else {
      return api.put('/note', noteData);
    }
  },
  
  getNotesByUserId: (userId) => api.get(`/note/user/${userId}`),
  getArchivedNotes: (userId) => api.get(`/note/archived/${userId}`),
  getNoteById: (id) => api.get(`/note/${id}`),
  deleteNote: (id) => api.delete(`/note/${id}`)
};

export const tagService = {
  createTag: (tagData) => api.post('/tag/create', tagData),
  getTagsByUserId: (userId) => api.get(`/tag/user/${userId}`),
  getNotesByTagId: (tagId) => api.get(`/tag/notes/${tagId}`),
  getTagById: (id) => api.get(`/tag/${id}`),
  updateTag: (tagData) => api.put('/tag', tagData),
  deleteTag: (id) => api.delete(`/tag/${id}`)
};

export default {
  userService,
  noteService,
  tagService
};
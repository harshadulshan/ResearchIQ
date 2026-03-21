import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const searchPapers = (query) => API.get(`/search?query=${query}`);
export const getPapers = () => API.get('/papers');
export const getPaper = (id) => API.get(`/papers/${id}`);
export const toggleBookmark = (id) => API.post(`/papers/${id}/bookmark`);
export const getBookmarks = () => API.get('/bookmarks');
export const sendChat = (id, message) => API.post(`/papers/${id}/chat`, { message });
export const getChatHistory = (id) => API.get(`/papers/${id}/chat/history`);
export const exportPDF = () => window.open('http://localhost:8000/export/pdf');
export const exportWord = () => window.open('http://localhost:8000/export/word');
export const getCitations = (id) => API.get(`/papers/${id}/citations`);
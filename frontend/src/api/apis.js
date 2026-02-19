import axiosInstance from './axiosInstance';

const createRecord = (data) => {
  return axiosInstance.post('/api/records', data);
};

const getRecords = (params) => {
  return axiosInstance.get('/api/records', { params });
};

const updateRecord = (id, data) => {
  return axiosInstance.put(`/api/records/${id}`, data);
};

const deleteRecord = (id) => {
  return axiosInstance.delete(`/api/records/${id}`);
};

export { createRecord, getRecords, updateRecord, deleteRecord };

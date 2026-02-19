import axiosInstance from './axiosInstance';

const createRecord = (data) => {
  return axiosInstance.post('/api/records', data);
};

const getRecords = () => {
  return axiosInstance.get('/api/records');
};

export { createRecord, getRecords };

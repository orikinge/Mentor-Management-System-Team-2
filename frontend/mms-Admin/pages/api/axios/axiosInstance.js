import axios from 'axios';
import * as LS from 'utils/localStorage';

const settings = {
  baseURL: '',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json;charset',
  },
};

const generateHeader = () => {
  let token = '';
  try {
    token = LS.get('token');
  } catch (error) {}
  return token ? `Bearer ${token}` : '';
};

export const axiosInstance = (baseUrl) => {
  settings.baseURL = baseUrl;
  settings.headers.Authorization = generateHeader();
  return axios.create(settings);
};

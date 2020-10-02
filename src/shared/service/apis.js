import axios from 'axios';
import globalConfig from '../../globalConfig';
const host =
    process.env.NODE_ENV === 'production'
        ? globalConfig.service.URL_PROD
        : globalConfig.service.URL_DEV;
const baseURL = `${host}/api/v1`;

const token = localStorage.getItem('token');
const axiosIntance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default axiosIntance;

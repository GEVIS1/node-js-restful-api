import axios from 'axios';
import { gistURL } from '../../db/v1/seeder/data';

const axiosInstance = axios.create({
  baseURL: gistURL,
});

export default axiosInstance;

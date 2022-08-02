import axios from 'axios';
import { gistURL } from '../db/seeder/data';

const axiosInstance = axios.create({
  baseURL: gistURL,
});

export default axiosInstance;

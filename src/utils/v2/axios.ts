import axios from 'axios';

const getAvatar = axios.create({
  baseURL: 'https://avatars.dicebear.com/api/human/',
});

export { getAvatar };

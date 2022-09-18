import axios from 'axios';

/**
 * URL to the avatar service used for User creation
 */
const baseURL = 'https://avatars.dicebear.com/api/human/';
/**
 * An axios instance with the baseURL set to the avatar service used
 */
const getAvatar = axios.create({
  baseURL,
});

export { getAvatar, baseURL };

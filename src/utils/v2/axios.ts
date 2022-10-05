import axios from 'axios';

/**
 * URL to the avatar service used for User creation
 */
const avatarBaseUrl = 'https://avatars.dicebear.com/api/human/';

/**
 * An axios instance with the baseURL set to the avatar service used
 */
const getAvatar = axios.create({
  baseURL: avatarBaseUrl,
});

/**
 * URL to the API used for quiz data
 */
const quizBaseUrl = 'https://opentdb.com/';

/**
 * URL to the quiz categories
 */
const quizCategoriesUrl = `${quizBaseUrl}api_category.php`;

/**
 * Default quiz parameters
 */
const defaultQuizParams = '?amount=10&encode=base64';

/**
 * URL to the quiz categories
 */
const quizDataUrl = `${quizBaseUrl}api.php${defaultQuizParams}`;

/**
 * An axios instance with the baseURL set to the quiz categories
 */
const getCategories = axios.create({
  baseURL: quizCategoriesUrl,
});

/**
 * An axios instance with the baseURL set to the quiz categories
 */
const getQuiz = axios.create({
  baseURL: quizDataUrl,
});

export {
  avatarBaseUrl,
  getAvatar,
  quizBaseUrl,
  quizCategoriesUrl,
  getCategories,
  getQuiz,
};

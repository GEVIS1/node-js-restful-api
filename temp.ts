/* eslint-disable no-console */
import axios from 'axios';

const URL = 'https://opentdb.com/api.php?amount=10&encode=base64';

// https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
const base64 = {
  decode: (inputString: string) => {
    const buff = Buffer.from(inputString, 'base64');
    return buff.toString('ascii');
  },
  encode: (inputString: string) => {
    const buff = Buffer.from(inputString, 'ascii');
    return buff.toString('base64');
  },
};

async function run() {
  const res = await axios.get(URL);

  type Question = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };

  const temp = structuredClone(res.data);

  const fetchedData = temp.results;

  console.log('res.data', res.data);
  const decodedData = res.data.results.map((question: Question) => {
    for (const [key, value] of Object.entries(question)) {
      switch (key) {
        case 'category':
        case 'type':
        case 'difficulty':
        case 'question':
        case 'correct_answer':
          question[key] = base64.decode(value as string);
          break;
        case 'incorrect_answers':
          question[key].forEach((answer: string, i: number) => {
            question[key][i] = base64.decode(answer as string);
          });
          break;
        default:
          throw Error('Could not parse question.');
      }
    }
    return question;
  });

  const encodedData = structuredClone(decodedData).map((question: Question) => {
    for (const [key, value] of Object.entries(question)) {
      switch (key) {
        case 'category':
        case 'type':
        case 'difficulty':
        case 'question':
        case 'correct_answer':
          question[key] = base64.encode(value as string);
          break;
        case 'incorrect_answers':
          question[key].forEach((answer: string, i: number) => {
            question[key][i] = base64.encode(answer as string);
          });
          break;
        default:
          throw Error('Could not parse question.');
      }
    }
    return question;
  });

  console.log('decodedData', decodedData);
  console.log('encodedData', encodedData);
  console.log('JSON.stringify(fetchedData)', JSON.stringify(fetchedData));
  console.log('JSON.stringify(encodedData)', JSON.stringify(encodedData));
  console.log(
    'JSON.stringify(fetchedData) === JSON.stringify(encodedData)',
    JSON.stringify(fetchedData) === JSON.stringify(encodedData)
  );
}

run();

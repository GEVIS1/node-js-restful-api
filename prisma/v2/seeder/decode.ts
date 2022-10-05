import base64 from '../../../src/utils/v2/base64';
import { FetchedQuestion } from './seeders';

const decodeQuestion = (question: FetchedQuestion) => {
  for (const [key, value] of Object.entries(question)) {
    switch (key) {
      case 'category':
      case 'type':
      case 'difficulty':
      case 'question':
      case 'correct_answer':
        // TODO: Fix this embarrassing hack.. 🤦‍♂️
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // eslint-disable-next-line
        (question as any)[key] = base64.decode(value as string);
        break;
      case 'incorrect_answers':
        question[key].forEach((answer: string, i: number) => {
          question[key][i] = base64.decode(answer as string);
        });
        break;
      case typeof Number:
      case typeof Symbol:
      default:
        throw Error('Could not parse question.');
    }
  }
  return question;
};

export default decodeQuestion;

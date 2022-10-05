/**
 * Robinson, S. (2021, July 16). Encoding and Decoding Base64 Strings in Node.js. Stack Abuse. Retrieved October 5, 2022, from https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
 */
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

export default base64;

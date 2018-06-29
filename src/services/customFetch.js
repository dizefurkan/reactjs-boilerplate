import axios from 'axios';

export default async (obj) => {
  try {
    return await axios(obj);
  } catch (err) {
    return err;
  }
};

import axios from 'axios';

const getItem = async () => {
  try {
    return await axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
    });
  } catch (err) {
    return err;
  }
};

const postItem = async () => {
  try {
    return await axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: {
        username: 'asdasdasdas',
      },
    });
  } catch (err) {
    return err;
  }
};

export {
  getItem,
  postItem,
};

import decode from 'jwt-decode';
import fetch from './customFetch';

export default class authService {
  async login(username, password) {
    try {
      const obj = {
        method: 'post',
        url: 'http://localhost:3030/login',
        data: {
          username,
          password,
        },
      };
      return await fetch(obj);
    } catch (err) {
      return err;
    }
  }
}

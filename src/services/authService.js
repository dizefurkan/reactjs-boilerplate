import decode from 'jwt-decode';
import axios from 'axios';
export default class authService {
  constructor(domain) {
    this.domain = domain || 'http://localhost:3030';
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    return axios({
      method: 'post',
      url: `${this.domain}/login`,
      data: {
        username,
        password,
      }
    })
  }
};

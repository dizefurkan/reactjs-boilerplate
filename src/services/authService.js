import decode from 'jwt-decode';
import fetch from './customFetch';

export default class authService {
  async login(data) {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      if (this.loggedIn()) {
        headers.Authorization = `Bearer ${this.getToken()}`;
      }
      const obj = {
        method: 'post',
        url: 'http://localhost:3030/login',
        data,
        headers,
      };
      const response = await fetch(obj);
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return await this.checkStatus(response);
    } catch (err) {
      return err;
    }
  }

  async register(data) {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const obj = {
        method: 'post',
        url: 'http://localhost:3030/register',
        data,
        headers,
      };
      const response = await fetch(obj);
      return response;
    } catch (err) {
      return err;
    }
  }

  async resetPassword(data) {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const obj = {
        method: 'post',
        url: 'http://localhost:3030/reset-password',
        data,
        headers,
      };
      const response = await fetch(obj);
      return response;
    } catch (err) {
      return err;
    }
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status <= 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return err;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return decode(this.getToken());
  }
}

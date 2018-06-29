import decode from 'jwt-decode';

export default class authService {
  constructor(domain) {
    this.domain = domain || 'http://localhost:3030';
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  async login(username, password) {
    const promise = await 
  }
};

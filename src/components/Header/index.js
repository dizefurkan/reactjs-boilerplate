import React from 'react';
import styles from './styles.css';
import globalStyles from '../../public/main.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <ul className={globalStyles.clearfix}>
          <li className={styles.title}>
            <a href="/">
              <i className="fas fa-user"></i>
              <span>Home</span>
            </a>
          </li>
          <li className={styles.title}><a href="/login">Login</a></li>
          <li className={styles.title}><a href="/register">Register</a></li>
        </ul>
      </div>
    );
  }
}

export default Header;

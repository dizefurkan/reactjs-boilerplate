import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './styles.css';
import globalStyles from '../../public/main.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <ul className={globalStyles.clearfix}>
          <li className={styles.title}>
            <FontAwesomeIcon icon={['fas', 'home']} />
          </li>
          <li className={styles.title}><a href="#">Link</a></li>
          <li className={styles.title}><a href="#">Link</a></li>
          <li className={styles.title}><a href="#">Link</a></li>
          <li className={styles.title}><a href="#">Link</a></li>
        </ul>
      </div>
    );
  }
}

export default Header;
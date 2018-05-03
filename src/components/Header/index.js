import React from 'react';
import styles from './styles.css'
import globalStyles from '../../public/main.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <ul className={globalStyles.clearfix}>
          <li className={styles.title}><a href="javascript:;">Link</a></li>
          <li className={styles.title}><a href="javascript:;">Link</a></li>
          <li className={styles.title}><a href="javascript:;">Link</a></li>
          <li className={styles.title}><a href="javascript:;">Link</a></li>
        </ul>
      </div>
    )
  }
}

export default Header;
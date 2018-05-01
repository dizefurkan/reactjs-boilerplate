import React from 'react';
import styles from './styles.css'
import globalStyles from '../../public/main.css';

class Header extends React.Component {
  render() {
    return (
      <ul className={globalStyles.clearfix}>
        <li className={styles.title}><a href="javascript:;">Link</a></li>
        <li className={styles.title}><a href="javascript:;">Link</a></li>
        <li className={styles.title}><a href="javascript:;">Link</a></li>
        <li className={styles.title}><a href="javascript:;">Link</a></li>
      </ul>
    )
  }
}

export default Header;
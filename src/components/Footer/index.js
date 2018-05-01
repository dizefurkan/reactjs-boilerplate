import React from 'react';
import styles from './styles.css'
import globalStyles from '../../public/main.css';

class Footer extends React.Component {
  render() {
    return (
      <div>
        <h4>
          <a
            href="https://github.com/dizefurkan"
            className={styles.title}
          >
            github.com/dizefurkan
          </a>
        </h4>
      </div>
    )
  }
}

export default Footer;
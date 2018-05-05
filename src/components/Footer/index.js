import React from 'react';
import styles from './styles.css';
import globalStyles from '../../public/main.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer container">
        <div className="row">
          <div className="col-xs-12">
            <h4 className={`${styles.title} araba`}>
              <a
                href="https://github.com/dizefurkan"
                className={styles.title}
              >
                github.com/dizefurkan
          </a>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;

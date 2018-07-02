import React from 'react';
import cx from 'classnames';
import { Grid, Col, Row } from 'react-bootstrap';
import gbStyles from 'public/main.css';
import styles from './styles.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className={styles.header}>
                <ul className={cx(
                  gbStyles.clearfix,
                  styles.list,
                )}>
                  <li className={styles.title}>
                    <a href="/">Home</a>
                  </li>
                  <li className={styles.title}>
                    <a href="/login">Login</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>
      </header>
    );
  }
}

export default Header;

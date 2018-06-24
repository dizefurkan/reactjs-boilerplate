import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import gbStyles from 'public/main.css';
import styles from './styles.css';

class Header extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className="header">
              <ul className={gbStyles.clearfix}>
                <li className={styles.title}>
                  <a href="/">
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li className={styles.title}>
                  <a href="/login">Login</a>
                </li>
                <li className={styles.title}>
                  <a href="/register">Register</a
                ></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Header;

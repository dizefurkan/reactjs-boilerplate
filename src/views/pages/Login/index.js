import React from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import gbStyles from 'src/public/main.css';
import styles from './styles.css';

class Login extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Login Page</h1>
            <form action="" className={gbStyles.clearfix} >
              <input
                type="text"
                className={styles.input}
                placeholder="Username"
              />
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
              />
              <input
                type="submit"
                className={styles.submit}
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;

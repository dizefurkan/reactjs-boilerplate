import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import AuthService from 'services/authService';
import { Link } from 'react-router-dom';
import { Grid, Col, Row } from 'react-bootstrap';
import gbStyles from 'public/main.css';
import styles from './styles.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

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
                    <Link to="/">Home</Link>
                  </li>
                  <li className={styles.title}>
                    {
                      this.props.state.auth
                      ? <Link
                          to='/'
                          onClick={e => this.logout(e)}>
                          Logout
                        </Link>
                      : <Link to='/login'>Login</Link>
                    }
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

Header.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Header;

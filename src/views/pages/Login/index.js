import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import validateField from 'src/services/validateField';
import gbStyles from 'src/public/main.css';
import styles from './styles.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formField: {
        email: '',
        password: '',
      },
      validation: {
        form: false,
        email: false,
        password: false,
      },
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const { validation } = this.state;
    if (validation.email && validation.password) {
      validation.form = true;
      this.setState({
        validation,
      });
    } else {
      validation.form = false;
      this.setState({
        validation,
      });
    }
  }

  controlFormValidity() {
    const { email, password } = this.state;
    const formSubmitObj = this.formObject(email, password);
    const result = validateField(formSubmitObj);
    this.controlField(result);
  }

  formObject(email, password) {
    const formObject = {
      email: {
        isRequired: true,
        length: {
          min: 5,
          max: 40,
        },
        value: email,
        syntax: true,
      },
      password: {
        isRequired: true,
        length: {
          min: 6,
          max: 40,
        },
        value: password,
      },
    };
    return formObject;
  }

  onChange(event) {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value,
    }, () => {
      this.controlFormValidity();
    });
  }

  controlField(obj) {
    const {
      email,
      password,
      validation,
      formField,
    } = this.state;
    if (obj.email) {
      validation.email = false;
      formField.email = obj.email.message;
    } else {
      validation.email = true;
      formField.email = '';
    }
    if (obj.password) {
      validation.password = false;
      formField.password = obj.password.message;
    } else {
      validation.password = true;
      formField.password = '';
    }
    this.setState({
      validation,
      formField,
    });
  }

  render() {
    const { validation, formField } = this.state;
    return (
      <DocumentTitle title={this.props.title}>
        <Grid>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              <h2>{this.props.title} Page</h2>
              <form
                className={gbStyles.clearfix}
                onSubmit={e => this.onSubmit(e)}
              >
                <span className={styles.inputErrorMessage}>
                  { !validation.email && formField.email }
                </span>
                <div className={cx(
                  styles.inputBox,
                  gbStyles.clearfix,
                )}>
                  <div className={cx(
                    styles.inputMeta,
                    {
                      [styles.fieldError]: !validation.email
                        && formField.email.length,
                    },
                  )}>
                    <i className="far fa-user"></i>
                    <span className={styles.inputLabel}>
                      email
                    </span>
                  </div>
                  <input
                    type="email"
                    className={cx(
                      styles.input,
                      {
                        [styles.inputError]: !validation.email
                          && formField.email.length,
                      },
                    )}
                    placeholder="Example: test@test.com"
                    name="email"
                    onChange={e => this.onChange(e) }
                    required
                  />
                </div>
                <span className={styles.inputErrorMessage}>
                  { !validation.password && formField.password }
                </span>
                <div className={cx(
                  styles.inputBox,
                  gbStyles.clearfix,
                )}>
                  <div className={cx(
                    styles.inputMeta,
                    {
                      [styles.fieldError]: !validation.password
                        && formField.password.length,
                    },
                  )}>
                    <i className="fas fa-key"></i>
                    <span className={styles.inputLabel}>
                      Password
                    </span>
                  </div>
                  <input
                    type="password"
                    className={cx(
                      styles.input,
                      {
                        [styles.inputError]: !validation.password
                          && formField.password.length,
                      },
                    )}
                    placeholder="Example: 135645"
                    name="password"
                    onChange={e => this.onChange(e)}
                    required
                  />
                </div>
                <input
                  type="submit"
                  className={styles.submit}
                  value='Submit'
                />
              </form>
            </Col>
          </Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Login;
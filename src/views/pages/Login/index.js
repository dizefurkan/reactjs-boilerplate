import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import validateField from 'utils/validateField';
import formFieldObject from 'utils/formFieldObject';
import AuthService from 'services/authService';
import gbStyles from 'public/main.css';
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
        email: false,
        password: false,
      },
      submitMessage: '',
    };
    this.AuthService = new AuthService();
  }

  async onSubmit(event) {
    event.preventDefault();
    const { email, password, validation } = this.state;
    this.controlFormValidity('email', email);
    this.controlFormValidity('password', password);
    const data = { email, password };
    if (validation.email && validation.password) {
      const result = await this.AuthService.login(data);
      const { data: { user, found, message } } = result;
      const submitMessage = found ? `${user.name} ${user.surname}` : message;
      this.setState({
        submitMessage,
      });
      if (found) {
        window.location.reload();
      }
    }
  }

  controlFormValidity(fieldName, fieldValue) {
    const formSubmitObj = this.formObject(fieldName, fieldValue);
    const result = validateField(formSubmitObj);
    this.controlField(result);
  }

  formObject(fieldName, fieldValue) {
    return formFieldObject(fieldName, fieldValue);
  }

  onChange(event) {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value,
    });
  }

  controlField(obj) {
    const {
      validation,
      formField,
    } = this.state;
    const fieldName = Object.keys(obj)[0];
    if (obj[fieldName]) {
      if (obj[fieldName].hasError) {
        validation[fieldName] = false;
        formField[fieldName] = obj[fieldName].message;
      } else {
        validation[fieldName] = true;
        formField[fieldName] = '';
      }
    }
    this.setState({
      validation,
      formField,
    });
  }

  render() {
    const {
      validation,
      formField,
      submitMessage,
    } = this.state;
    if (this.props.auth) {
      return <Redirect to='/' />;
    }
    return (
      <DocumentTitle title={this.props.title}>
        <Grid>
          <Row>
            <Col xs={12} md={6} mdOffset={3} sm={12} lg={6} lgOffset={3}>
              <h2>{this.props.title} Page</h2>
              <form
                className={gbStyles.clearfix}
                onSubmit={e => this.onSubmit(e)}
              >
                {
                  <p className={styles.submitMessage}>
                    {submitMessage}
                  </p>
                }
                <div className={styles.inputContainer}>
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
                      <i className="far fa-user" title="email"></i>
                      <span className={styles.inputLabel}>
                        email
                      </span>
                    </div>
                    <input
                      type="input"
                      className={cx(
                        styles.input,
                        {
                          [styles.inputError]: !validation.email
                            && formField.email.length,
                        },
                      )}
                      placeholder="Example: test@test.com"
                      name="email"
                      title="email"
                      onChange={e => this.onChange(e) }
                    />
                  </div>
                  {
                    !validation.email &&
                    <div className={styles.inputErrorMessageBox}>
                      <span className={styles.inputErrorMessage}>
                        {formField.email}
                      </span>
                    </div>
                  }
                </div>
                <div className={styles.inputContainer}>
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
                      <i className="fas fa-key" title="password"></i>
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
                      title="password"
                      onChange={e => this.onChange(e)}
                    />
                  </div>
                  {
                    !validation.password &&
                    <div className={styles.inputErrorMessageBox}>
                      <span className={styles.inputErrorMessage}>
                        {formField.password}
                      </span>
                    </div>
                  }
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
  auth: PropTypes.bool.isRequired,
};

export default Login;

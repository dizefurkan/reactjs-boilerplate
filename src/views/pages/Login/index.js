import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import validateField, { hasOwnProperty } from 'utils/validateField';
import formFieldObject from 'utils/formFieldObject';
import AuthService from 'services/authService';
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
    if (validation.email && validation.password) {
      const result = await this.AuthService.login(email, password);
      const hasData = hasOwnProperty(result.data, 'success');
      if (hasData) {
        console.log(result.data);
        const { data: { success, message, token } } = result;
        const submitMessage = success ? token : message;
        this.setState({
          submitMessage,
        });
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
      email,
      password,
      validation,
      formField,
    } = this.state;
    if (obj.email) {
      if (obj.email.hasError) {
        validation.email = false;
        formField.email = obj.email.message;
      } else {
        validation.email = true;
        formField.email = '';
      }
    }
    if (obj.password) {
      if (obj.password.hasError) {
        validation.password = false;
        formField.password = obj.password.message;
      } else {
        validation.password = true;
        formField.password = '';
      }
    }
    this.setState({
      validation,
      formField,
    });
  }

  render() {
    const { validation, formField, submitMessage } = this.state;
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
                {
                  <p className={styles.submitMessage}>
                    {submitMessage}
                  </p>
                }
                <div className={styles.inputContainer}>
                  {
                    !validation.email &&
                    <div className={styles.inputErrorMessageBox}>
                      <span className={styles.inputErrorMessage}>
                        { formField.email }
                      </span>
                    </div>
                  }
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
                </div>
                <div className={styles.inputContainer}>
                  {
                    !validation.password &&
                    <div className={styles.inputErrorMessageBox}>
                      <span className={styles.inputErrorMessage}>
                        {formField.password}
                      </span>
                    </div>
                  }
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
                      title="password"
                      onChange={e => this.onChange(e)}
                    />
                  </div>
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

import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import validator from 'react-validation';
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
  }

  onChange(event) {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value,
    }, () => {
      this.validationField(name, value);
    });
  }

  validationField(fieldName, value) {
    const { formField, validation } = this.state;
    let invalidType;
    switch (fieldName) {
      case 'email':
        invalidType = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (value.length <= 5) {
          formField[fieldName] =
            `${fieldName} can not be short than 5 characters`;
          validation[fieldName] = false;
        } else if (!invalidType) {
          formField[fieldName] = 'Please enter a valid email';
          validation[fieldName] = false;
        } else {
          formField[fieldName] = '';
          validation[fieldName] = true;
        }
        break;
      case 'password':
        if (value.length <= 6) {
          formField[fieldName] =
            `${fieldName} can not be short than 6 characters`;
          validation[fieldName] = false;
        } else {
          formField[fieldName] = '';
          validation[fieldName] = true;
        }
        break;
      default:
        break;
    }
    if (value.length === 0) {
      formField[fieldName] = '';
      validation[fieldName] = false;
    }
    this.setState({
      validation,
      formField,
    });
  }

  render() {
    const { validation, formField } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <h1>Login Page</h1>
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
    );
  }
}

export default Login;

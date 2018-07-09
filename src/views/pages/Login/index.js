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
import Form from 'src/views/partitions/Form';
import Alert from 'src/views/partitions/Alert';
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
      isSubmited: false,
      submitMessage: '',
      isShow: false,
    };
    this.AuthService = new AuthService();
  }
  close() { this.setState({ isShow: false }); }
  async onSubmit(event) {
    event.preventDefault();
    const { email, password, validation } = this.state;
    this.setState({ isShow: true });
    this.controlFormValidity('email', email);
    this.controlFormValidity('password', password);
    const data = { email, password };
    this.setState({ isSubmited: true });
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
    const { formField, isShow } = this.state;
    if (this.props.auth) {
      return <Redirect to='/' />;
    }
    return (
      <DocumentTitle title={this.props.title}>
        <Grid>
          <Row>
            <Col
              xs={12}
              md={6} mdOffset={3}
              sm={8} smOffset={2}
              lg={6} lgOffset={3}
            >
              <h2>{this.props.title} Page</h2>
              {
                (isShow && (formField.email || formField.password)) &&
                <Alert
                  close={e => this.close(e)}
                  messages={<AlertMessage formField={formField} />}
                />
              }
              <form onSubmit={e => this.onSubmit(e)}>
              {
                Form.login.map((item, index) => (
                  <div key={index} className={styles.inputBox}>
                    <label className={styles.label}>{item.title}</label>
                    <input
                      className={styles.input}
                      onChange={e => this.onChange(e)}
                      {...item}
                    />
                  </div>
                ))
              }
              <input
              type='submit'
              className={styles.submit}
              />
              </form>
            </Col>
          </Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

class AlertMessage extends Component {
  render() {
    const { formField } = this.props;
    const result = Object.keys(formField).map((item, index) =>
      <div key={index}>{ formField[item]}</div>);
    return <div>{result}</div>;
  }
}

AlertMessage.propTypes = {
  formField: PropTypes.object,
};

Login.propTypes = {
  title: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default Login;

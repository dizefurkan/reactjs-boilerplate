import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import validateField, { isValidated } from 'utils/validateField';
import formSchema from 'utils/formSchema';
import AuthService from 'services/authService';
import Form from 'src/views/partitions/Form';
import FormStyles from 'src/views/partitions/Form/styles.css';
import Alert from 'src/views/partitions/Alert';
// import gbStyles from 'public/main.css';
import styles from './styles.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
      },
      formMessage: {
        email: '',
        password: '',
        submit: '',
      },
      validation: {
        email: false,
        password: false,
      },
      isSubmited: false,
      isAlertActive: false,
    };
    this.AuthService = new AuthService();
  }
  close(key) {
    this.setState({ isAlertActive: false });
  }
  async onSubmit(event) {
    event.preventDefault();
    const {
      form,
      validation,
      formMessage,
    } = this.state;
    formMessage.submit = '';
    this.setState({ formMessage });
    Object.keys(form).map(key => this.controlFormValidity(key, form[key]));
    this.setState({ isAlertActive: true, isSubmited: true });
    if (isValidated(validation)) {
      const result = await this.AuthService.login(form);
      const { data: { user, found, message } } = result;
      formMessage.submit = found
        ? `${user.name} ${user.surname}`
        : message;
      this.setState({ formMessage });
      if (found) {
        window.location.reload();
      }
    }
  }
  controlFormValidity(fieldName, fieldValue) {
    const formSubmitObj = this.formFieldSchema(fieldName, fieldValue);
    const result = validateField(formSubmitObj);
    this.controlField(result);
  }
  formFieldSchema(fieldName, fieldValue) {
    return formSchema(fieldName, fieldValue);
  }
  onChange(event) {
    const { form } = this.state;
    const { target: { value, name } } = event;
    form[name] = value;
    this.setState({ form });
  }
  controlField(obj) {
    const {
      validation,
      formMessage,
    } = this.state;
    const fieldName = Object.keys(obj)[0];
    if (obj[fieldName]) {
      if (obj[fieldName].hasError) {
        validation[fieldName] = false;
        formMessage[fieldName] = obj[fieldName].message;
      } else {
        validation[fieldName] = true;
        formMessage[fieldName] = '';
      }
    }
    this.setState({
      validation,
      formMessage,
    });
  }
  render() {
    const {
      formMessage,
      isAlertActive,
      validation,
    } = this.state;
    if (this.props.state.auth) {
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
              <h2>{this.props.title}</h2>
              {
                isAlertActive &&
                !isValidated(validation) &&
                <Alert
                  close={e => this.close(e)}
                  messages={<AlertMessage formMessage={formMessage} />}
                />
              }
              <form onSubmit={e => this.onSubmit(e)}>
                {
                  Form.login.map((item, index) => (
                    <div key={index} className={FormStyles.inputBox}>
                      <label className={FormStyles.label}>{item.title}</label>
                      <input
                        className={FormStyles.input}
                        onChange={e => this.onChange(e)}
                        {...item}
                      />
                    </div>
                  ))
                }
                <input
                  type='submit'
                  className={FormStyles.submit}
                />
              </form>
              <p>
                <a href='/reset-password'>Forget password?</a>
              </p>
              <p>
                Not have account yet?&nbsp;
                <a href='/register'>sign up</a>
              </p>
            </Col>
          </Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

class AlertMessage extends Component {
  render() {
    const { formMessage } = this.props;
    return Object.keys(formMessage).map((item, index) =>
      <div key={index}>{formMessage[item]}</div>);
  }
}

AlertMessage.propTypes = {
  formMessage: PropTypes.object,
};

Login.propTypes = {
  title: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
};

export default Login;

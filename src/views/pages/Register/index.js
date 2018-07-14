import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid, Row, Col } from 'react-bootstrap';
import fetch from 'services/customFetch';
import Alert from 'src/views/partitions/Alert';
import AuthService from 'services/authService';
import Form from 'src/views/partitions/Form';
import FormStyles from 'src/views/partitions/Form/styles.css';
import formSchema from 'utils/formSchema';
import validateField, { isValidated } from 'utils/validateField';
import styles from './styles.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        username: '',
        password: '',
        name: '',
        surname: '',
      },
      formMessage: {
        email: '',
        username: '',
        password: '',
        name: '',
        surname: '',
        submit: '',
      },
      validation: {
        email: false,
        username: false,
        password: false,
        name: false,
        surname: false,
      },
      isSubmited: false,
      isAlertActive: false,
    };
    this.AuthService = new AuthService();
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
      const result = await this.AuthService.register(form);
    }
  }
  controlFormValidity(fieldName, fieldValue) {
    const formObj = this.formFieldSchema(fieldName, fieldValue);
    const validateResult = validateField(formObj);
    this.controlField(validateResult);
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
  formFieldSchema(fieldName, fieldValue) {
    return formSchema(fieldName, fieldValue);
  }
  onChange(event) {
    const { form } = this.state;
    const { target: { name, value } } = event;
    form[name] = value;
    this.setState({ form });
  }
  close(e) {
    this.setState({ isAlertActive: false });
  }
  render() {
    const {
      formMessage,
      validation,
      isAlertActive,
    } = this.state;
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
                  Form.register.map((item, index) => (
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
                Already have account go&nbsp;
                <a href='/login'>sign in</a>
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

Register.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Register;

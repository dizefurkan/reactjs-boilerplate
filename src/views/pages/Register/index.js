import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
// import styles from './styles.css';

class Register extends Component {
  render() {
    return (
      <DocumentTitle title={this.props.title}>
        <div>
          <h1>Register Page</h1>
        </div>
      </DocumentTitle>
    );
  }
}

Register.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Register;

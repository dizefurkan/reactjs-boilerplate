import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Home from 'components/Home';
import styles from './styles.css';

class Private extends Component {
  render() {
    if (!this.props.auth) {
      return <Redirect to='/login' />;
    }
    return (
      <Home title='Home' />
    );
  }
}

Private.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default Private;

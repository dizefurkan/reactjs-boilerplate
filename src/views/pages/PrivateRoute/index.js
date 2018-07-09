import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from 'react-router-with-props';
import { Redirect } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
// import styles from './styles.css';

class PrivateRoute extends Component {
  render() {
    if (!this.props.auth) { return <Redirect to='/login' />; }
    return (
      <div>
        <Header auth={this.props.auth}/>
        <PropsRoute
          {...this.props}
        />
        <Footer />
      </div>
    );
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default PrivateRoute;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { PropsRoute } from 'react-router-with-props';
import { Redirect } from 'react-router-dom';
import cx from 'classnames';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styles from './styles.css';

class PrivateRoute extends Component {
  render() {
    if (!this.props.state.auth) { return <Redirect to='/login' />; }
    return (
      <DocumentTitle title={this.props.title}>
        <div className={cx({
          [styles.modalActive]: this.props.state.modal,
        })}>
          <Header state={this.props.state}/>
          <PropsRoute
            {...this.props}
          />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

PrivateRoute.propTypes = {
  state: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  modal: PropTypes.func,
};

export default PrivateRoute;

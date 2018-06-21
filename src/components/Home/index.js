import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Header from 'components/Header';
import Section from 'components/Section';
import Footer from 'components/Footer';
import styles from './styles.css';

class Home extends Component {
  render() {
    return (
      <DocumentTitle title={this.props.title}>
        <div>
          <Header />
          <Section />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

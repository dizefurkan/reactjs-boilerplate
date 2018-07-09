import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class Alert extends Component {
  render() {
    return (
      <div className={styles.box}>
        {this.props.messages}
        <span className={styles.close} onClick={e => this.props.close(e)}>
          <i className={`${styles.icon} far fa-window-close`}></i>
        </span>
      </div>
    );
  }
}

Alert.propTypes = {
  messages: PropTypes.element,
  close: PropTypes.func,
};

export default Alert;

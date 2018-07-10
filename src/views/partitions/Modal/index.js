import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './styles.css';

class Modal extends Component {
  render() {
    return (
      <div className={styles.modalBox}>
        <div className={styles.filter}></div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div
                className={styles.closeBox}
                onClick={this.props.onClick}
              >
                <span className={styles.close}>
                  &#x2715;
                </span>
              </div>
              <div className={styles.box}>
                {this.props.child}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Modal.propTypes = {
  child: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;

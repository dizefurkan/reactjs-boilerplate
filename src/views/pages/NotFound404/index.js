import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './styles.css';

class NotFound404 extends Component {
  render() {
    return (
      <DocumentTitle title={this.props.title}>
        <Grid>
          <Row>
            <Col xs={12}>
              <h1 className={styles.title}>{this.props.title}</h1>
            </Col>
          </Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default NotFound404;

NotFound404.propTypes = {
  title: PropTypes.string.isRequired,
};

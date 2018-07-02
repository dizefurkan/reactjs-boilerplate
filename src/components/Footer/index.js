import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './styles.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Grid>
          <Row>
            <Col xs={12}>
              <h4 className={styles.title}>
                <a
                  href="https://github.com/dizefurkan"
                  className={styles.title}
                >
                  github.com/dizefurkan
                </a>
              </h4>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}

export default Footer;

import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Section />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Footer />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

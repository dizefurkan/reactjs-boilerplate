import React from 'react';
import fetch from 'services/customFetch';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './styles.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      haveData: false,
    };
  }

  async clickHandler(event) {
    event.preventDefault();
    const obj = {
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
    };
    const data = await fetch(obj);
    this.setState({
      haveData: true,
      data,
    });
  }

  clearData(event) {
    this.setState({
      haveData: false,
      data: '',
    });
  }

  render() {
    const { haveData, data } = this.state;
    return (
      <section className={styles.section}>
        <Grid>
          <Row>
            <Col xs={12}>
              <h1 className={styles.title}>This is Home Area</h1>
              {
                haveData ? (
                  <button onClick={e => this.clearData(e)}>Clear Data</button>
                ) : (
                  <button onClick={e => this.clickHandler(e)}>Get Data</button>
                )
              }
              {
                haveData &&
                data.data.map((item, index) => (
                  <div key={index}>
                    {item.id} {item.title}
                  </div>
                ))
              }
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

export default Home;

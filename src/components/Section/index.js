import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { getItem } from 'services/test';
import styles from './styles.css';

class Section extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      haveData: false,
    };
  }
  async clickHandler(event) {
    event.preventDefault();
    const getItemResult = await getItem();
    this.setState({
      haveData: true,
      data: getItemResult,
    });
  }

  clearData(event) {
    this.setState({
      haveData: false,
      data: '',
    });
  }

  render() {
    const { haveData, data, array } = this.state;
    return (
      <div className={styles.section}>
        <Grid>
          <Row>
            <Col xs={12}>
              <h1 className={styles.title}>This is Section Area</h1>
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
      </div>
    );
  }
}

export default Section;

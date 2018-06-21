import React from 'react';
import styles from './styles.css';

class Section extends React.Component {
  render() {
    return (
      <div className={styles.section}>
        <h1 className={styles.title}>This is Section Area</h1>
      </div>
    );
  }
}

export default Section;

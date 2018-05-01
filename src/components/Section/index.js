import React from 'react';
import styles from './styles.css'

class Section extends React.Component {
  render() {
    return (
      <div className={styles.box}>
      <h2 className={styles.title}>SECTION</h2>
      </div>
    )
  }
}

export default Section;
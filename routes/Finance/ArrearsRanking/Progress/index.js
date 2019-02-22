import React, { Component } from 'react';
import styles from './index.module.less';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: [],
    };
  }
  render() {
    return <div className={styles.innerBar} style={{ width: this.props.percent }} />;
  }
}

export default Progress;

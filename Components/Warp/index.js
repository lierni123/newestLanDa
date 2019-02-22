import React, { Component } from 'react';
import styles from './index.module.less';
export default class Warp extends Component {
  render() {
    const { width = '100%', height, background } = this.props;
    return (
      <div className={styles.normal} style={{ height, width, backgroundColor: background }}>
        {this.props.children}
      </div>
    );
  }
}

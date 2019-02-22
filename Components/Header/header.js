import React, { Component } from 'react';
import styles from './header.module.less';
class Header extends Component {
  render() {
    return (
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={require('../../images/logo.png')} alt="" />
          </div>
          <div className={styles.title}>
            <div className={styles.titleBg} />
            <p>{this.props.title}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;

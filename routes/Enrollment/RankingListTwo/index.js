import React, { Component } from 'react';
import styles from './index.module.less';
import personBg from '../../../images/person.png';
function Circle({ n }) {
  return <span className={styles.circle + ' ' + styles['circle' + n]}>{n}</span>;
}
class PeopleIcon extends Component {
  render() {
    const n = this.props.n;
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(1);
    }

    //console.log(arr);
    return (
      <div className={styles.personContainer}>
        {arr.map((value, key) => {
          return (
            <span
              key={key}
              className={styles.personBg}
              style={{ backgroundImage: 'url(' + personBg + ')' }}
            />
          );
        })}
      </div>
    );
  }
}
class RankingListTwo extends Component {
  render() {
    return (
      <ul className={styles.ranking}>
        <li>
          <div className={styles.left}>
            <Circle n={6} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>奥鹏直属南京中山路学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={5} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={7} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>弘成直属南京·浦口学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={4} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={8} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>苏州学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={3} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={9} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>无锡·江阴学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={2} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Circle n={10} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.schoolName}>徐州学习中心</h2>
            <div className={styles.detail}>
              <PeopleIcon n={1} />
              <span className={styles.personNum}>5680人</span>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
export default RankingListTwo;

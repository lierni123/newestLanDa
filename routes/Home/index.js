import React, { Component } from 'react';
import styles from './index.module.less';
import finance from '../../images/finance.png';
import data from '../../images/data.png';
import study from '../../images/study.png';
import { toFullScreen } from '@utils/tool';

class Home extends Component {
  btn = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      bords: [
        {
          img: data,
          title: '招生数据看板',
          checked: false,
        },
        {
          img: finance,
          title: '财务数据看板',
          checked: false,
        },
        {
          img: study,
          title: '学情数据看板',
          checked: false,
        },
      ],
      keys: [],
    };
  }

  //操作selec表单;
  handleCheck = key => {
    return e => {
      const checked = e.target.checked;
      if (checked) {
        this.setState({
          keys: [...this.state.keys, key],
        });
      } else {
        this.setState({
          keys: this.state.keys.filter(item => item !== key),
        });
      }
    };
  };

  //确定提交事件
  handleSubmit = () => {
    const btn = this.btn.current;
    if (this.state.keys.length === 0) {
      btn.style.disabled = true;
    } else {
      this.props.router.push({
        pathname: '/show',
        query: {
          keys: this.state.keys.join(','),
        },
      });
      toFullScreen(true);
    }
  };
  //点击进入对应面板
  selectBord = key => {
    this.props.router.push({
      pathname: '/show',
      query: { keys: key },
    });
    toFullScreen(true);
  };

  render() {
    const { keys } = this.state;
    return (
      <div className={styles.normal}>
        <div className={styles.chooseBord}>
          <div className={styles.top}>
            <h2>看板选择</h2>
            {keys.length > 0 ? (
              <input
                ref={this.btn}
                type="button"
                defaultValue="确定"
                className={styles.submitBtn}
                onClick={this.handleSubmit}
              />
            ) : (
              <input
                ref={this.btn}
                type="button"
                defaultValue="确定"
                className={styles.beforeSubmitBtn}
                onClick={this.handleSubmit}
              />
            )}
          </div>
          <ul className={styles.entrance}>
            {this.state.bords.map((value, key) => {
              return (
                <li key={key}>
                  <div onClick={this.selectBord.bind(this, key)}>
                    <img src={value.img} alt="" />
                  </div>
                  <label>
                    <div className={styles.bottom}>
                      <input
                        type="checkbox"
                        checked={keys.indexOf(key) !== -1}
                        onChange={this.handleCheck(key)}
                      />
                      <span className={styles.setCheckBox} />
                      <span className={styles.bordsName}>{value.title}</span>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import Finance from '../Finance';
import Enrollment from '../Enrollment';
import Study from '../Study';
import styles from './index.module.less';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import { toFullScreen } from '@utils/tool';
export default class Show extends Component {
  constructor(props) {
    super(props);
    this.n = 0;
    this.t = -1;
    this.mySwiper = null;
    this.tip = null;
  }
  state = {
    tipVisible: true,
    keys: [],
  };
  UNSAFE_componentWillMount() {
    const keys = this.props.location.query.keys;
    this.setState({
      keys: keys.split(','),
    });
  }
  render() {
    const { tipVisible, keys } = this.state;
    return (
      <div className={styles.normal}>
        <div className={styles.wrap}>
          <div className="swiper-containerOne">
            <div className="swiper-wrapper">
              {keys.map((item, index) => {
                return (
                  <div className="swiper-slide" key={index}>
                    {item === '0' ? <Enrollment /> : null}
                    {item === '1' ? <Finance /> : null}
                    {item === '2' ? <Study /> : null}
                  </div>
                );
              })}
            </div>
            {keys.length > 1 ? <div className="swiper-pagination" /> : ''}
          </div>
        </div>
        <div
          className={styles.tip}
          onMouseEnter={this.onTip(true)}
          onMouseLeave={this.onTip(false)}>
          <div style={{ visibility: tipVisible ? 'visible' : 'hidden' }} id="tag">
            点击<span className={styles.keyName}>Q</span>键即可退出全屏
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let startX = 0;
    let endX = 0;
    document.addEventListener('keydown', this.bindEsc);
    this.mySwiper = new Swiper('.swiper-containerOne', {
      pagination: {
        el: '.swiper-pagination',
      },
      effect: 'fade',
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      followFinger: false,
      on: {
        touchStart: e => {
          startX = e.pageX;
          clearTimeout(this.t);
        },
        touchEnd: e => {
          endX = e.pageX;
          if (endX - startX > 15) {
            this.n--;
            if (this.n < 0) {
              this.n = this.state.keys.length - 1;
            }
          } else if (endX - startX < -15) {
            this.n++;
            if (this.n >= this.state.keys.length) {
              this.n = 0;
            }
          }
          setTimeout(() => {
            this.mySwiper.slideTo(this.n, 100, false);
            this.autoPlay();
          }, 100);
        },
      },
    });
    if (this.state.keys.length !== 1) {
      this.autoPlay();
      setTimeout(() => {
        this.setState({ tipVisible: false });
      }, 2000);
    }
    this.tip = setTimeout(() => {
      const tip = document.getElementById('tag');
      tip.style.visibility = 'hidden';
    }, 5 * 1000);
  }

  autoPlay = () => {
    if (this.t) clearTimeout(this.t);
    this.t = setTimeout(() => {
      this.n++;
      if (this.n >= this.state.keys.length) {
        this.n = 0;
      }
      this.mySwiper.slideTo(this.n, 100, false);
      this.autoPlay();
    }, 30 * 1000);
  };

  onTip = bool => {
    return () => {
      this.setState({
        tipVisible: bool,
      });
    };
  };
  bindEsc = e => {
    if (e.which === 81 && e) {
      toFullScreen(false);
      this.props.router.push({
        pathname: '/index',
      });
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.bindEsc);
    clearTimeout(this.t);
    this.mySwiper = null;
    clearTimeout(this.tip);
  }
}

import React, { Component } from 'react';
import style from './login.module.less';
//import loginbackground from '../../images/login.png';
import md5 from 'js-md5';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      loginSize: {},
      UserName: '',
      Password: window.localStorage.password,
      Code: '', //需要验证码
      message: '',
      r: '1',
    };
  }

  componentDidMount() {
    const _self = this;
    _self.bgResize();
    window.addEventListener('resize', function() {
      try {
        clearTimeout(_self.withReseze);
      } catch (e) {}
      _self.withReseze = setTimeout(function() {
        _self.bgResize();
      }, 100);
    });
  }
  handleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };
  randomFun = () => {
    this.setState({
      r: Math.round(Math.random() * 100) + 1,
    });
  };
  render() {
    const { UserName, Password, Code, r } = this.state;
    return (
      <div
        className={style.loginWrap}
        style={{
          width: this.state.loginSize.width,
          height: this.state.loginSize.height,
        }}>
        <div className={style.loginCon}>
          <div className={style.loginBox}>
            <div
              className={style.erro}
              style={{ visibility: this.state.message !== '' ? 'visible' : 'hidden' }}>
              <span />
              {this.state.message}
            </div>
            <input
              type="text"
              placeholder="用户名"
              value={UserName}
              onChange={this.changeVal('UserName')}
              onKeyUp={e => this.enterLogin(e)}
            />
            <input
              type="password"
              placeholder="密码"
              value={Password}
              onChange={this.changeVal('Password')}
              onKeyUp={e => this.enterLogin(e)}
            />
            <div className={style.login_icon}>
              <div className={style.login_text}>
                <input
                  type="text"
                  value={Code}
                  onChange={this.changeVal('Code')}
                  placeholder="请输入验证码"
                  onKeyUp={e => this.enterLogin(e)}
                />
                <img onClick={this.randomFun} src={`/verifycode?=${r}`} />
              </div>
            </div>
            <div className={style.passwordTip}>
              <span>
                <label>
                  <input type="checkbox" checked={this.state.checked} onChange={this.handleCheck} />
                  <span className={style.setCheckBox} />
                  记住密码
                </label>
              </span>
            </div>
            <input
              type="button"
              defaultValue="登 录"
              className={style.submitBtn}
              onClick={this.login.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
  enterLogin(e) {
    const _self = this;
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      if (_self.state.UserName && _self.state.Password && _self.state.Code) {
        _self.login();
        console.log('00000');
      }
    } else {
      return false;
    }
  }
  changeVal = key => {
    return e => {
      this.setState({
        [key]: e.target.value,
      });
    };
  };
  bgResize() {
    const imgratio = 1920 / 1080;
    const width = document.documentElement.clientWidth;
    // var height = document.documentElement.clientHeight-90;
    const height = document.documentElement.clientHeight;
    // height = height < 420 ? 420 : height;
    // width = width < 330 ? 330 : width;
    console.log(height);
    const ratio = width / height;
    let imgWidth;
    let imgHeight;
    let marginTop;
    let marginLeft;
    if (imgratio > ratio) {
      imgWidth = height * imgratio;
      imgHeight = height;
      marginTop = 0;
      marginLeft = (width - imgWidth) / 2;
    } else {
      imgWidth = width;
      imgHeight = width / imgratio;
      marginTop = (height - imgHeight) / 2;
      marginLeft = 0;
    }
    const loginSize = {
      imgWidth: imgWidth,
      imgHeight: imgHeight,
      contentTop: (height - 420) * 0.5,
      contentLeft: (width - 330) * 0.75,
      marginTop: marginTop,
      marginLeft: marginLeft,
      width,
      height,
    };
    this.setState({ loginSize: loginSize });
  }

  login() {
    const _self = this;
    const pname = window.location.pathname;
    const src = /\/$/.test(pname) ? pname : pname + '/';
    let dataInfo = '';
    dataInfo += 'UserName=' + encodeURIComponent(_self.eudcode(_self.state.UserName));
    dataInfo += '&Password=' + encodeURIComponent(_self.eudcode(_self.state.Password));
    dataInfo += '&Code=' + encodeURIComponent(_self.state.Code);

    let sign = encodeURIComponent(window.cxt.eduToken + dataInfo + 'EduToKen');
    const reg = new RegExp('[' + window.cxt.bodySignFilter + ']', 'g');
    sign = sign.replace(reg, '');
    fetch(src + 'login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        eduSign: md5(sign),
        eduToken: window.cxt.eduToken,
        eduRefUrl: window.location.href,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: dataInfo,
    })
      .then(json => {
        if (json.ok) {
          json.text().then(data => {
            const mes = JSON.parse(data);
            if (mes.code === 1) {
              if (
                window.location.origin + window.location.pathname === mes.data ||
                window.location.origin + window.location.pathname + '/' === mes.data
              ) {
                window.location.reload();
              }
              if (this.state.checked) {
                window.location.href = mes.data + window.location.hash;
                window.localStorage.setItem('username', this.state.UserName);
                window.localStorage.setItem('password', this.state.Password);
              } else {
                window.location.href = mes.data + window.location.hash;
                window.localStorage.setItem('username', this.state.UserName);
                window.localStorage.setItem('password', '');
              }
            } else {
              this.setState({
                message: mes.message,
              });
              console.log(this.state.message);
            }
          });
        }
      })
      .catch(json => {});
  }
  eudcode(txt) {
    if (typeof txt !== 'string') {
      return txt;
    }
    let s = '';
    for (let i = 0; i < txt.length; i++) {
      if (i !== 0) {
        s += ',';
      }
      s += txt.charCodeAt(i);
    }
    return s;
  }
}
export default Login;

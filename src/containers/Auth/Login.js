import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../services';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      passwsord: "",
      isShowPassword: false,
      errMessage: ""
    }
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  handleLogin = async () => {
    let err = ''
    try {
      let data= await userService.handleLoginAPI(this.state.username, this.state.password)
      if(data && data.errCode!==0){
        err= data.message
      }
      //errCode = 0 mean login success
      if(data && data.errCode==0){
        this.props.userLoginSuccess(data.user)
        console.log("qua ok");
      }
    } catch (e) {
      if (e.response) {
        if(e.response.data){
          err=e.response.data.message;
        }
        
      }
    }
    this.setState({
      errMessage: err
    })
  }

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    })
  }

  render() {

    return (
      <div className='login-background'>
        <div className='login-container'>
          <div className='login-content row'>
            <div className='col-12 text-center login-text'>Login </div>
            <div className='col-12 form-group login-input'>
              <label>Username</label>
              <input type='text' className='form-control'
                placeholder='User name'
                value={this.state.username}
                onChange={event => this.handleOnChangeUsername(event)}></input>
            </div>
            <div className='col-12 form-group login-input'>
              <label>Password</label>
              <div className='custom-input-password'>
                <input type={this.state.isShowPassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={event => this.handleOnChangePassword(event)}>
                </input>
                <div onClick={() => this.handleShowHidePassword()}>
                  <i class={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                </div>
              </div>
            </div>
            <div className='col-12' style={{ color: 'red' }}> {this.state.errMessage}</div>
            <div className='col-12'>
              <button className='btn-login'
                onClick={() => this.handleLogin()}
              >Login</button>
            </div>
            <div className='col-12'>
              <span className='forgot-pw'>Forgot password?</span>
            </div>
            <div className='col-12 text-center mt-3'>
              <span className='login-with'>Or login with: </span>
            </div>
            <div className='col-12 social-login'>
              <i className="fab fa-google google"></i>
              <i className='fab fa-facebook-f facebook'></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo)=> dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

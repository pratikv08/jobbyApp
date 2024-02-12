import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    isLoginFailed: false,
  }

  onSuccessfullLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureOfLogin = errMsg => {
    this.setState({
      isLoginFailed: true,
      errMsg,
    })
  }

  onSubmitLoginForm = async event => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    event.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfullLogin(data.jwt_token)
    } else {
      this.onFailureOfLogin(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
      isLoginFailed: false,
      errMsg: '',
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
      isLoginFailed: false,
      errMsg: '',
    })
  }

  render() {
    const {username, password, isLoginFailed, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-sub-container">
          <img
            alt="website logo"
            className="web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form
            className="login-form-container"
            onSubmit={this.onSubmitLoginForm}
          >
            <div className="label-input-container">
              <label className="username-password-label" htmlFor="username">
                USERNAME
              </label>
              <input
                placeholder="Username"
                className="username-password-input"
                type="text"
                id="username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="label-input-container">
              <label className="username-password-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                placeholder="Password"
                className="username-password-input"
                type="password"
                id="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isLoginFailed && <p className="err-msg">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

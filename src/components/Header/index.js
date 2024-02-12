import {IoMdHome} from 'react-icons/io'
import {IoBagHandle} from 'react-icons/io5'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          className="web-logo-in-header"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="header-icon-container1">
        <li className="each-header-link">
          <Link to="/">
            <IoMdHome className="home-icon" />
          </Link>
        </li>
        <li className="each-header-link">
          <Link to="/jobs">
            <IoBagHandle className="job-icon" />
          </Link>
        </li>
        <li className="each-header-link">
          <FiLogOut className="logout-icon" />
        </li>
      </ul>
      <div className="header-options-container">
        <ul className="header-icon-container2">
          <li className="each-header-link">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="each-header-link">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)

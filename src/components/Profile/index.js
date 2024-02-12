import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiConstantStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}
class Profile extends Component {
  state = {apiStatus: apiConstantStatus.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      apiStatus: apiConstantStatus.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const profileDetails = fetchedData.profile_details
      const filteredData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetail: filteredData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  onRetryProfile = () => {
    this.getProfileData()
  }

  renderProfile = () => {
    const {profileDetail} = this.state
    const {name, profileImageUrl, shortBio} = profileDetail
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="user-name">{name}</h1>
        <p className="user-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderRetryBtn = () => (
    <div className="profile-btn-container">
      <button
        className="profile-retry-btn"
        type="button"
        onClick={this.onRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderFinalProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderProfile()
      case apiConstantStatus.failure:
        return this.renderRetryBtn()
      case apiConstantStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-container">{this.renderFinalProfile()}</div>
    )
  }
}
export default Profile

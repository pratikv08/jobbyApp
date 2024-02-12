import {Component} from 'react'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoBagHandleSharp, IoLocation} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'

const apiConstantStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {jobItemObj: {}, apiStatus: apiConstantStatus.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFilteredData2 = eachData => ({
    companyLogoUrl: eachData.company_logo_url,
    employmentType: eachData.employment_type,
    id: eachData.id,
    location: eachData.location,
    rating: eachData.rating,
    title: eachData.title,
    jobDescription: eachData.job_description,
  })

  getFilteredData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompanyDescription: data.life_at_company.description,
    lifeAtCompanyImageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills,
    title: data.title,
  })

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiConstantStatus.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const fileterdObj = {
        jobDetails: this.getFilteredData(fetchedData.job_details),
        similarJobs: fetchedData.similar_jobs.map(eachSimilarJob =>
          this.getFilteredData2(eachSimilarJob),
        ),
      }
      this.setState({
        jobItemObj: fileterdObj,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  renderJobItemDetailsList = () => {
    const {jobItemObj} = this.state
    const {jobDetails, similarJobs} = jobItemObj
    const {
      companyLogoUrl,
      employmentType,
      location,
      rating,
      title,
      jobDescription,
      packagePerAnnum,
      skills,
      lifeAtCompanyDescription,
      companyWebsiteUrl,
      lifeAtCompanyImageUrl,
    } = jobDetails
    console.log(companyLogoUrl)
    return (
      <div>
        <div className="job-detail-item">
          <div className="each-job-sub-container">
            <div className="img-rating-container">
              <img
                className="company-img"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="title-rating-container">
                <h4 className="title">{title}</h4>
                <div className="star-rating-container">
                  <FaStar className="star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-emptype-container">
              <div className="loc-emp-container">
                <div className="loc-emp-sub-container">
                  <IoLocation className="loc-emp-icon" />
                  <p className="loc-emp-text">{location}</p>
                </div>
                <div className="loc-emp-container">
                  <IoBagHandleSharp className="loc-emp-icon" />
                  <p className="loc-emp-text">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
          <div>
            <div className="description-visit-container">
              <h1 className="description-job-text">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="company-website-container"
              >
                <p className="visit-text">Visit</p>
                <FaExternalLinkAlt className="visit-icon" />
              </a>
            </div>
            <p className="job-description-details">{jobDescription}</p>
          </div>
          <h1 className="skills-text">Skills</h1>
          <ul className="skills-container">
            {skills.map(skill => (
              <li className="skill" key={skill.name}>
                <img
                  className="skill-img"
                  src={skill.image_url}
                  alt={skill.name}
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-text">Life at Company</h1>
          <div className="life-container">
            <p className="life-at-description">{lifeAtCompanyDescription}</p>
            <img
              className="company-img2"
              src={lifeAtCompanyImageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-container">
          {similarJobs.map(eachJob => (
            <SimilarJobs eachData={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  onRetryJobItemDetails = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetailsListFailureStatus = () => (
    <div className="job-list-failure-container">
      <img
        className="failure-joblist-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-joblist-heading">Oops! Something Went Wrong</h1>
      <p className="failure-joblist-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onRetryJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFinalContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderJobItemDetailsList()
      case apiConstantStatus.failure:
        return this.renderJobItemDetailsListFailureStatus()
      case apiConstantStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderFinalContent()}
        </div>
      </>
    )
  }
}

export default JobItemDetails

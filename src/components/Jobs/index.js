import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import JobDetails from '../JobDetails'
import SortEmployeeType from '../SortEmployeeType'
import SalaryRangeType from '../SalaryRangeType'
import './index.css'
import Header from '../Header'

const apiConstantStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiConstantStatus.initial,
    typeValue: '',
    rangeValue: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetail()
  }

  getJobDetail = async () => {
    const {typeValue, rangeValue, searchInput} = this.state
    this.setState({
      apiStatus: apiConstantStatus.inProgress,
    })
    console.log(typeValue)
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeValue}&minimum_package=${rangeValue}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const filteredData = data.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        location: eachData.location,
        rating: eachData.rating,
        title: eachData.title,
        jobDescription: eachData.job_description,
        packagePerAnnum: eachData.package_per_annum,
      }))
      this.setState({
        jobsList: filteredData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  renderJobList = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul className="job-details-container">
          {jobsList.map(eachJob => (
            <JobDetails eachData={eachJob} key={eachJob.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="job-list-failure-container">
        <img
          className="failure-joblist-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failure-joblist-heading">No Jobs Found</h1>
        <p className="failure-joblist-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onRetryJobList = () => {
    this.getJobDetail()
  }

  renderJobListFailureStatus = () => (
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
      <button className="retry-btn" type="button" onClick={this.onRetryJobList}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  typeChange = id => {
    const {typeValue} = this.state
    const typeValueArray = typeValue ? typeValue.split(',') : []
    const updatedTypeValueArray = typeValueArray.includes(id)
      ? typeValueArray.filter(value => value !== id)
      : [...typeValueArray, id]
    const stringTypeValueArray = updatedTypeValueArray.join(',')
    this.setState(
      {
        typeValue: stringTypeValueArray,
      },
      this.getJobDetail,
    )
  }

  rangeChange = id => {
    this.setState(
      {
        rangeValue: id,
      },
      this.getJobDetail,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetail()
    }
    console.log(event.key)
  }

  onSearch = () => {
    this.getJobDetail()
  }

  renderFinalContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderJobList()
      case apiConstantStatus.failure:
        return this.renderJobListFailureStatus()
      case apiConstantStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {typeValue, rangeValue, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="search-bar-and-job-list-container">
            <div className="job-sub-container">
              <div className="input-search-icon-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDown}
                  value={searchInput}
                />
                <div className="search-icon-container">
                  <button
                    className="btn"
                    onClick={this.onSearch}
                    data-testid="searchButton"
                    aria-label="Search"
                    type="button"
                  >
                    <IoIosSearch className="search-icon" />
                  </button>
                </div>
              </div>
              <div className="profile-container1">
                <Profile />
                <h1 className="types-of-employment-heading">
                  Type of Employment
                </h1>
                <ul>
                  {employmentTypesList.map(employeeType => (
                    <SortEmployeeType
                      employeeType={employeeType}
                      key={employeeType.employmentTypeId}
                      typeChange={this.typeChange}
                      typeValue={typeValue}
                    />
                  ))}
                </ul>
                <h1 className="types-of-employment-heading">Salary Range</h1>
                <ul>
                  {salaryRangesList.map(rangeType => (
                    <SalaryRangeType
                      rangeType={rangeType}
                      key={rangeType.salaryRangeId}
                      rangeChange={this.rangeChange}
                      rangeValue={rangeValue}
                    />
                  ))}
                </ul>
              </div>
            </div>
            {this.renderFinalContent()}
          </div>
          <div className="profile-container2">
            <Profile />
            <h1 className="types-of-employment-heading">Type of Employment</h1>
            <ul>
              {employmentTypesList.map(employeeType => (
                <SortEmployeeType
                  employeeType={employeeType}
                  key={employeeType.employmentTypeId}
                  typeChange={this.typeChange}
                  typeValue={typeValue}
                />
              ))}
            </ul>
            <h1 className="types-of-employment-heading">Salary Range</h1>
            <ul>
              {salaryRangesList.map(rangeType => (
                <SalaryRangeType
                  rangeType={rangeType}
                  key={rangeType.salaryRangeId}
                  rangeChange={this.rangeChange}
                  rangeValue={rangeValue}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

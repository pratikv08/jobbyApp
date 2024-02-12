import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {IoBagHandleSharp, IoLocation} from 'react-icons/io5'
import './index.css'

const JobDetails = props => {
  const {eachData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    rating,
    title,
    jobDescription,
    packagePerAnnum,
  } = eachData
  return (
    <li className="each-job">
      <Link className="link" to={`/jobs/${id}`}>
        <div className="each-job-sub-container">
          <div className="img-rating-container">
            <img
              className="company-img"
              src={companyLogoUrl}
              alt="company logo"
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
          <h1 className="description-text">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobDetails

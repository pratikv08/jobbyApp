import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {IoBagHandleSharp, IoLocation} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {eachData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    rating,
    title,
    jobDescription,
  } = eachData
  return (
    <li className="sim-each-job">
      <Link className="link" to={`/jobs/${id}`}>
        <div className="sim-each-job-sub-container">
          <div className="sim-img-rating-container">
            <img
              className="sim-company-img"
              src={companyLogoUrl}
              alt="similar job company logo"
            />
            <div className="sim-title-rating-container">
              <h4 className="sim-title">{title}</h4>
              <div className="sim-star-rating-container">
                <FaStar className="sim-star" />
                <p className="sim-rating">{rating}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="sim-description-text">Description</h1>
          <p className="sim-job-description">{jobDescription}</p>
        </div>
        <div className="sim-location-emptype-container">
          <div className="sim-loc-emp-container">
            <div className="sim-loc-emp-sub-container">
              <IoLocation className="sim-loc-emp-icon" />
              <p className="sim-loc-emp-text">{location}</p>
            </div>
            <div className="sim-loc-emp-container">
              <IoBagHandleSharp className="sim-loc-emp-icon" />
              <p className="sim-loc-emp-text">{employmentType}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default SimilarJobs

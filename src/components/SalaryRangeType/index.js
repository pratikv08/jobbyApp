import './index.css'

const SalaryRangeType = props => {
  const {rangeType, rangeChange, rangeValue} = props
  const {label, salaryRangeId} = rangeType
  const onRangeChange = () => {
    rangeChange(salaryRangeId)
  }
  return (
    <li className="type-container">
      <input
        className="checkbox"
        type="radio"
        name="salaryRange"
        onChange={onRangeChange}
        value={rangeValue}
        id={salaryRangeId}
      />
      <label className="type-label">{label}</label>
    </li>
  )
}
export default SalaryRangeType

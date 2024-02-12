import './index.css'

const SortEmployeeType = props => {
  const {employeeType, typeChange, typeValue} = props
  const {label, employmentTypeId} = employeeType
  const onTypeChange = () => {
    typeChange(employmentTypeId)
  }
  return (
    <li className="type-container">
      <input
        className="checkbox"
        type="checkbox"
        onChange={onTypeChange}
        value={typeValue}
        id={employmentTypeId}
      />
      <label className="type-label">{label}</label>
    </li>
  )
}
export default SortEmployeeType

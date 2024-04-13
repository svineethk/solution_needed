// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachAppoint, onStarClicked} = props
  const {id, title, date, isStarred} = eachAppoint

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starClicked = () => {
    onStarClicked(id)
  }

  return (
    <li className="each-appoint">
      <div className="name-container">
        <p className="each-name">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={starClicked}
          data-testid="star"
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="each-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem

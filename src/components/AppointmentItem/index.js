import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {aptObj, isStarred} = props
  const {title, date, id, isStar} = aptObj

  return (
    <li className="content-con">
      <div className="flexProps">
        <h1>{title}</h1>
        <button
          type="button"
          onClick={event => isStarred(event)}
          className="star-button"
          data-testid="star"
        >
          {!isStar ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
              id={id}
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
              id={id}
            />
          )}
        </button>
      </div>
      <p>Date:{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
    </li>
  )
}

export default AppointmentItem

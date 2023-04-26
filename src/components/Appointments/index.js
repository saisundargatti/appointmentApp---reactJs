import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    aptList: [],
    activeList: [],
    activeButton: false,
  }

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getDate = event => {
    this.setState({date: event.target.value})
  }

  originalState = () => {
    this.setState({title: '', date: ''})
  }

  updateList = event => {
    event.preventDefault()
    const {title, date} = this.state
    this.setState(
      prevState => ({
        aptList: [
          ...prevState.aptList,
          {id: uuidv4(), title, date, isStar: false},
        ],
      }),
      this.originalState,
    )
  }

  isStarred = event => {
    const {aptList} = this.state

    this.setState({
      aptList: aptList.map(eachItem => {
        if (eachItem.id === event.target.id) {
          if (eachItem.isStar === false) {
            return {...eachItem, isStar: true}
          }
          return {...eachItem, isStar: false}
        }
        return {...eachItem}
      }),
    })
  }

  renderList = list => (
    <ul>
      {list.map(eachItem => (
        <AppointmentItem
          aptObj={eachItem}
          key={eachItem.id}
          isStarred={this.isStarred}
        />
      ))}
    </ul>
  )

  renderStarred = () => {
    const {aptList, activeButton} = this.state

    if (!activeButton) {
      const starredList = aptList.filter(eachItem => eachItem.isStar === true)
      this.setState({activeList: starredList, activeButton: true})
    } else {
      this.setState({activeButton: false})
    }
  }

  renderAllViews = () => {
    const {activeButton, activeList, aptList} = this.state
    switch (activeButton) {
      case true:
        return this.renderList(activeList)

      case false:
        return this.renderList(aptList)

      default:
        return null
    }
  }

  render() {
    const {title, date, activeButton} = this.state
    const isActiveButton = activeButton ? 'active-button' : ''

    return (
      <div className="bg-container">
        <section className="section-container">
          <div className="displayProps">
            <form className="form-container">
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                value={title}
                onChange={this.getTitle}
                id="title"
              />
              <label htmlFor="date">
                Date
                <input
                  type="date"
                  value={date}
                  onChange={this.getDate}
                  id="date"
                />
              </label>
              <button type="submit" onClick={this.updateList}>
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="h-line" />
          <div className="displayProps">
            <h3>Appointments</h3>
            <button
              type="button"
              className={`starred-button ${isActiveButton}`}
              onClick={this.renderStarred}
            >
              Starred
            </button>
          </div>
          {this.renderAllViews()}
        </section>
      </div>
    )
  }
}

export default Appointments

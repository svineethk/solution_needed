// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isStarred: false,
    copyList: [],
  }

  onChangeTitle = event => {
    if (event.target.value !== '') {
      this.setState({titleInput: event.target.value})
    }
  }

  onChangeDate = event => {
    if (event.target.value !== '') {
      this.setState({dateInput: event.target.value})
    }
  }

  onAddButton = () => {
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
      copyList: [...prevState.appointmentList, newAppointment],
    }))
  }

  onStarClicked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachList => {
        if (eachList.id === id) {
          return {...eachList, isStarred: !eachList.isStarred}
        }
        return eachList
      }),
      copyList: prevState.appointmentList.map(eachLists => {
        if (eachLists.id === id) {
          return {...eachLists, isStarred: !eachLists.isStarred}
        }
        return eachLists
      }),
    }))
  }

  filterStarred = () => {
    const {appointmentList, isStarred, copyList} = this.state
    let filteredCommentList = []

    if (isStarred === false) {
      filteredCommentList = appointmentList.filter(
        eachComment => eachComment.isStarred === true,
      )
    } else {
      filteredCommentList = copyList
    }

    this.setState(prevState => ({
      appointmentList: filteredCommentList,
      isStarred: !prevState.isStarred,
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentList, isStarred} = this.state

    const starBackgroundColorClassName = isStarred
      ? 'star-clicked'
      : 'star-nonClicked'

    return (
      <div className="app-container">
        <div className="container">
          <div className="entry-container">
            <div className="input-container">
              <h1 className="header">Add Appointment</h1>
              <label htmlFor="name" className="input-header">
                TITLE
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Title"
                onChange={this.onChangeTitle}
                value={titleInput}
              />
              <label htmlFor="date" className="input-header">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input"
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDate}
                value={dateInput}
              />
              <button
                type="button"
                onClick={this.onAddButton}
                className="button"
              >
                Add
              </button>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image-logo"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="display-container">
            <h1 className="display-header">Appointments</h1>
            <button
              type="button"
              className={`starred ${starBackgroundColorClassName}`}
              onClick={this.filterStarred}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {appointmentList.map(eachAppoint => (
              <AppointmentItem
                key={eachAppoint.id}
                eachAppoint={eachAppoint}
                onStarClicked={this.onStarClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

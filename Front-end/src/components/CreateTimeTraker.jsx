import { useState, useEffect } from 'react'
import Select from "./Select"
import { requestCollaborators, requestCreateTimeTracker } from '../services/services'
import { getUserOnStorage } from '../services/sessionStorage'

function CreateTimeTracker({ task, fetchTasks }) {
  const [collaborators, setCollaborators] = useState([])
  const [view, setView] = useState(true)
  const [tracker, setTracker] = useState({
    StartDate: '',
    EndDate: '',
    TimeZoneId: '',
    TaskId: task._id,
    CollaboratorId: ''
  })
  const [notification, setNotification] = useState({
    warning: '',
    success: ''
  });

  async function fetchCollaborators() {
    const token = getUserOnStorage()
    
    const response = await requestCollaborators(token)
    
    setCollaborators(response)
  }
  
  async function fetchCreateTimeTracker() {
    const token = getUserOnStorage()

    const payload = tracker
    Object.keys(payload).forEach((value) => {
      if (!payload[value]) {
        delete payload[value]
      }
    })

    if (payload.StartDate) {
      payload.StartDate = new Date(payload.StartDate)
    }

    if (payload.EndDate) {
      payload.EndDate = new Date(payload.EndDate)
    }

    const response = await requestCreateTimeTracker(payload, token);

    if (response.status === 204) {
      setNotification({success: 'created', warning: ''});
      
      fetchTasks()
      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  async function fetchStartTimeTracker() {
    const token = getUserOnStorage()

    const payload = {
      StartDate: new Date().toISOString(),
      TimeZoneId: tracker.TimeZoneId,
      TaskId: tracker.TaskId
    }
    
    const response = await requestCreateTimeTracker(payload, token);

    if (response.status === 204) {
      setNotification({success: 'created', warning: ''});
      
      fetchTasks()
      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  async function stopSubmit(event) {
    event.preventDefault()

    const { StartDate, EndDate } = tracker
    if (EndDate !== '' && StartDate > EndDate) {
      setNotification({
        ...notification,
        warning: 'StartDate can\'t bigger than EndDate'
      })
    } else {
      fetchCreateTimeTracker()

      setView(!view)

      setTracker({
        ...tracker,
        CollaboratorId: '',
        StartDate: '',
        EndDate: ''
      })
    }
  }

  useEffect(() => {
    fetchCollaborators()

    const timeZoneId = Intl.DateTimeFormat()
      .resolvedOptions().timeZone

    setTracker({
      ...tracker,
      TimeZoneId: timeZoneId
    })
  }, [])

  return (
    <>
      <div className='create-time-tracker'>
        {
          notification.warning.length > 0 && (
            <p className='warning'>{notification.warning}</p>
          )
        }
        {
          notification.success.length > 0 && (
            <p className='success'>{notification.success}</p>
          )
        }
        <div
          className='double-elem-container'
          style={{ display: view ? 'flex' : 'none' }}
        >
          <button
            onClick={() => setView(!view)}
          >Create time tracker</button>

          <button
            type='button'
            onClick={() => {
              fetchStartTimeTracker()
            }}
          >start new time tracker</button>
        </div>
        
        <div>
          <button
            className='warning-bg'
            style={
              { 
                display: !view ? 'block' : 'none',
                margin: 'auto'
              }
            }
            onClick={() => {
              setView(!view)
              setNotification({ success: '', warning: '' })
            }}
          >give up</button>
        </div>
      </div>
      <div style={{ display: !view ? 'block' : 'none' }}>
        <div>
          <label>Start date</label>
          <input
            type="datetime-local"
            name='startDate'
            value={tracker.StartDate}
            onChange={({ target }) => setTracker({
              ...tracker,
              StartDate: target.value
            })}
          />
        </div>
        <div>
          <label>End date</label>
          <input
            type="datetime-local"
            name='endDate'
            value={tracker.EndDate}
            onChange={({ target }) => setTracker({
              ...tracker,
              EndDate: target.value
            })}
          />
        </div>
        <div>
          <Select
            name='Collaborator'
            tracker={tracker}
            setTracker={setTracker}
            values={collaborators}
          />
        </div>
        <div>
          <button
            type='submit'
            disabled={tracker.StartDate.length === 0}
            onClick={(event) => stopSubmit(event)}
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateTimeTracker
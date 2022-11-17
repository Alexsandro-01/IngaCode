import {requestDeleteTimeTracker, requestUpdateTimeTracker} from '../services/services'
import {getUserOnStorage} from '../services/sessionStorage'
import {requestCollaborators} from '../services/services'
import {useState} from 'react'

function TimeTracker({tracker, fetchTasks}) {
  const [notification, setNotification] = useState({
    warning: '',
    success: ''
  });
  const [view, setView] = useState(true)
  const [collaborators, setCollaborators] = useState([])
  const [CollaboratorId, setCollaboratorId] = useState('')


  const startDate = new Date(tracker.StartDate)
    .toLocaleString(
      Intl.DateTimeFormat().resolvedOptions().locale,
      {timeZone: tracker.TimezoneId}
    )

  const endDate = new Date(tracker.EndDate)
    .toLocaleString(
      Intl.DateTimeFormat().resolvedOptions().locale,
      {timeZone: tracker.TimezoneId}
    )

  async function fetchDeleteTimeTracker() {
    const token = getUserOnStorage()

    const response = await requestDeleteTimeTracker(tracker._id, token);

    if (response.status === 204) {
      setNotification({success: 'deleted', warning: ''});
      
      fetchTasks()
      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  async function fetchUpdateTimeTracker(payload) {
    const token = getUserOnStorage()

    const response = await requestUpdateTimeTracker(
      payload,
      tracker._id,
      token
    );

    if (response.status === 204) {
      setNotification({success: 'updated', warning: ''});
      
      fetchTasks()
      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  async function fetchCollaborators() {
    const token = getUserOnStorage()
    
    const response = await requestCollaborators(token)
    
    setCollaborators(response)
  }
  
  return (
    <div className='time-tracker'>
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
      <div>
        <small>Start: {startDate}</small>
      </div>
      {
        tracker.EndDate ? (
          <div>
            <small>End: {endDate}</small>
          </div>
        ) : (
          <div>
            <button
              type='button'
              className='success'
              onClick={() => {
                const date = new Date();
                fetchUpdateTimeTracker({EndDate: date})
              }}
            >Finish task</button>
          </div>
        )
      }
      {
        tracker.CollaboratorName ? (
          <div>
            <small>Collaborator: {tracker.CollaboratorName}</small>
          </div>
        ) : (
          <>
            <div style={{ display: view ? 'block' : 'none' }}>
              <button
                type='button'
                className='success'
                onClick={() => {
                  setView(!view)
                  fetchCollaborators()
                }}
              >Set collaborator</button>
              </div>
                
            <div style={{ display: !view ? 'block' : 'none' }}>
              <select
                value={CollaboratorId}
                onChange={({target}) => {
                  setCollaboratorId(target.value)
                }}
              >
                <option value=''>-- select --</option>
                {
                  collaborators.length > 0 && (
                    collaborators.map((value) => (
                      <option key={value._id} value={value._id}>{value.Name}</option>
                    ))
                  )
                }
              </select>
              <button
                type='button'
                className='success'
                disabled={!CollaboratorId}
                onClick={() => {
                  setView(!view)
                  fetchUpdateTimeTracker({CollaboratorId})
                }}
              >Send collaborator</button>

            </div>
          </>
        )
      }
      <div>
        <button
          type='button'
          className='danger'
          onClick={() => fetchDeleteTimeTracker()}
        >Delete time tracker</button>
      </div>
    </div>
  )
}

export default TimeTracker

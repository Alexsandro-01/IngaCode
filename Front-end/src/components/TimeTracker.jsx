import {requestDeleteTimeTracker, requestUpdateTimeTracker} from '../services/services'
import {getUserOnStorage} from '../services/sessionStorage'
import {useState} from 'react'

function TimeTracker({tracker, fetchTasks}) {
  const [notification, setNotification] = useState({
    warning: '',
    success: ''
  });

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
  
  return (
    <div>
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
              onClick={() => {
                const date = new Date();
                fetchUpdateTimeTracker({EndDate: date})
              }}
            >finish task</button>
          </div>
        )
      }
      {
        tracker.CollaboratorName && (
          <div>
            <p>Collaborator: {tracker.CollaboratorName}</p>
          </div>
        )
      }
      <div>
        <button
          type='button'
          onClick={() => fetchDeleteTimeTracker()}
        >Delete time tracker</button>
      </div>
    </div>
  )
}

export default TimeTracker

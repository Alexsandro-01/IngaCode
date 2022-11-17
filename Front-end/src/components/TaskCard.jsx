import { useState } from 'react'
import CreateTimeTracker from "./CreateTimeTraker"
import TimeTracker from "./TimeTracker"
import { getUserOnStorage } from '../services/sessionStorage'
import { requestDeleteTask, requestUpdateTask } from '../services/services'
import '../styles/TaskCard.css'

function TaskCard({ task, fetchTasks }) {
  const [view, setView] = useState(true)
  const [updateTask, setUpdateTask] = useState({
    Name: task.Name,
    Description: task.Description,
  })
  const [notification, setNotification] = useState({
    warning: '',
    success: ''
  });

  async function fetchUpdateTask() {
    const token = getUserOnStorage();

    const payload = updateTask;

    Object.keys(payload).forEach((value) => {
      if (!payload[value]) {
        delete payload[value]
      }
    })
    
    const response = await requestUpdateTask(
      payload,
      task._id,
      token
    );

    if (response.status === 204) {
      setNotification({success: 'updated', warning: ''});
      
      fetchTasks()
      setView(!view)
      
      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  async function fetchDeleteTask() {
    const token = getUserOnStorage();
    
    const response = await requestDeleteTask(task._id, token);

    if (response.status === 204) {
      setNotification({success: 'deleted', warning: ''});
      
      fetchTasks()
      // setView(!view)
      
      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  return (
    <section className='task-card'>
      <div>
        <div className='task-info' style={{ display: view ? 'block' : 'none' }}>
          <div>
            <h3>{task.Name}</h3>
          </div>
          <div>
            <p>Description: {task.Description}</p>
          </div>
          <div>
            <p>Project: <strong>{task.ProjectName}</strong></p>
          </div>
        </div>
        
        <div style={{ display: !view ? 'block' : 'none' }}>
          <input
            type='text'
            value={updateTask.Name}
            onChange={(event) => {
              setUpdateTask({
                ...updateTask,
                Name: event.target.value
              })
            }}
          />
          <textarea
            type='text'
            value={updateTask.Description}
            onChange={(event) => {
              setUpdateTask({
                ...updateTask,
                Description: event.target.value
              })
            }}
          />
        </div>
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
        {
          view && (
            <div className='double-elem-container'>
              <button
                type='button'
                name='viewFormUpdatetask'
                onClick={() => {
                  setView(!view)
                }}
              >
                update task
              </button>
              <button
                type='button'
                name='deleteTask'
                className='danger'
                onClick={() => {
                  fetchDeleteTask()
                }}
              >
                delete task
              </button>
            </div>
          )
        }
        {
          !view && (
            <button
              type='button'
              onClick={() => {
                fetchUpdateTask()
              }}
            >
              send
            </button>
          )
        }
        </div>
          <CreateTimeTracker
            fetchTasks={fetchTasks}
            task={task}
          />
          {
            task.TimeTrackers.map((timeTracker) => (
              <TimeTracker
                fetchTasks={fetchTasks}
                key={timeTracker._id}
                tracker={timeTracker}
              />
            ))
          }
      </div>
    </section>
  )
}

export default TaskCard
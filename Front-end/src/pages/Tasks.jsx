import {Link, useNavigate} from 'react-router-dom'
import context from '../context/AppContext'
import {useEffect, useContext, useState} from 'react'
import {getUserOnStorage} from '../services/sessionStorage'
import {
  requestTasks,
  requestTime,
  requestProjects,
  requestCollaborators
} from '../services/services'
import TaskCard from '../components/TaskCard'
import Header from '../components/Header'

function Tasks() {
  const {
    tasks,
    setTasks,
    projects,
    setProjects
  } = useContext(context)
  const [tasksFiltered, setTasksFiltered] = useState(tasks)

  const [filter, setFilter] = useState({
    key: 'ProjectId',
    id: ''
  })

  const [collaborators, setCollaborators] = useState([])
  const [time, setTime] = useState({})
  const [view, setView] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getUserOnStorage();

    if (!token) {
      navigate('/');
    }
  }, []);

  async function fetchTasks() {
    const token = getUserOnStorage();
    
    const response = await requestTasks(token);
    setTasksFiltered(response)
    setTasks(response)
  }
  
  async function fetchTime() {
    const token = getUserOnStorage();
    const response = await requestTime(token)

    setTime(response)
  }

  async function fetchProjects() {
    const token = getUserOnStorage();

    const response = await requestProjects(token)

    setProjects(response);
  }

  async function fetchCollaborators() {
    const token = getUserOnStorage()
    
    const response = await requestCollaborators(token)
    
    setCollaborators(response)
  }

  function filterByProject() {
    const filteredTasks = tasks.filter((value) => {
      if (value[filter.key] === filter.id) {
        return value
      }
    })

    setTasksFiltered(filteredTasks)
  }

  function filterByCollaborator() {
    const filteredTasks = tasks.filter((value) => {
      let collaborator = false;

      for (let index = 0; index < value.TimeTrackers.length; ++index) {

        if (value.TimeTrackers[index].CollaboratorId === filter.id) {
          collaborator = true
        }
      }
      return collaborator;
    })

    setTasksFiltered(filteredTasks)
  }

  function filterTasks() {
    if (filter.key === 'ProjectId') {
      filterByProject()
    }

    if (filter.key === 'CollaboratorId') {
      filterByCollaborator()
    }
  }

  useEffect(() => {
    fetchTasks()
    fetchProjects()
    fetchCollaborators()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [filter.id])
  
  useEffect(() => {
    fetchTime()
  }, [tasks])

  const {today, month} = time;
  
  return(
    <main className='create-page'>
      <Header title='Tasks' />
        {
          today && (
            <section className='time'>
              <p>
                Time today:
                {' '}
                <code>
                  {today.hours <= 9 ? '0' + today.hours : today.hours}
                </code>:
                <code>
                  {today.minutes <= 9 ? '0' + today.minutes : today.minutes}
                </code>
              </p>
              <p>
                Time month:
                {' '}
                <code>
                  {month.hours <= 9 ? '0' + month.hours : month.hours}
                </code>:
                <code>
                  {month.minutes <= 9 ? '0' + month.minutes : month.minutes}
                </code>
              </p>
            </section>
          )
        }
        <section className='filter'>
          <div>
            <label htmlFor="filterProject">

              <input
                type="radio"
                name='filter'
                id='filterProject'
                checked={view}
                onChange={() => {
                  setView(true)
                }}
              />
              Filter by project
            </label>

            <label htmlFor="filterCollaborator">
              <input
                type="radio"
                name='filter'
                id='filterCollaborator'
                checked={!view}
                onChange={() => {
                  setView(false)
                }}
              />
              Filter by collaborator
            </label>
          </div>
          <div style={{ display: view ? 'flex' : 'none' }}>

            <label htmlFor="selectProject">Project</label>

            <select
              value={filter.id}
              onChange={({target}) => {
                setFilter({
                  key: 'ProjectId',
                  id: target.value
                })
              }}
              id="selectProject"
            >
              <option value=''>-- select --</option>
              {
                projects.length > 0 && (
                  projects.map((value) => (
                    <option key={value._id} value={value._id}>{value.Name}</option>
                  ))
                )
              }
            </select>

          </div>
          <div style={{ display: !view ? 'flex' : 'none' }}>

            <label htmlFor='filterCollaborator'>Collaborator</label>

            <select
              value={filter.id}
              onChange={({target}) => {
                setFilter({
                  key: 'CollaboratorId',
                  id: target.value
                })
              }}
              id='filterCollaborator'
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
          </div>

          <div>
            <button
              type='button'
              onClick={() => {
                fetchTasks()
                setFilter({
                  ...filter,
                  id: ''
                })
              }}
            >clear filters</button>
          </div>

        </section>
        <div className='container'>
          {
            tasksFiltered.length > 0 && (
              tasksFiltered.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  fetchTasks={fetchTasks}
                />
              ))
            )
          }
          {
          tasksFiltered.length === 0 && (
            <section>
              <p>There are no tasks.</p>
            </section>
          )
        }
        </div>
    </main>
  )
}

export default Tasks

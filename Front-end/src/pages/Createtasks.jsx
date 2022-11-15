import {Link, useNavigate} from 'react-router-dom'
import context from '../context/AppContext'
import {useEffect, useState, useContext} from 'react'
import {getUserOnStorage} from '../services/sessionStorage'
import {requestCreateTask, requestProjects} from '../services/services'
import '../styles/createPages.css'

function CreateTask() {
  const [task, setTask] = useState({
    Name: '',
    Description: '',
    ProjectId: ''
  })
  const [notification, setNotification] = useState({
    warning: '',
    success: ''
  });
  const {projects, setProjects} = useContext(context)
  const navigate = useNavigate()

  async function stopSubmit(event) {
    event.preventDefault();
    const token = getUserOnStorage();

    const data = task

    const response = await requestCreateTask(data, token);
    if (response.status === 204) {
      setNotification({success: 'created', warning: ''});

      setTask({
        Name: '',
        Description: '',
        ProjectId: ''
      })

      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  async function fetchProjects() {
    const token = getUserOnStorage();

    const response = await requestProjects(token)

    setProjects(response);
  }

  useEffect(() => {
    const token = getUserOnStorage();

    if (!token) {
      navigate('/');
    }

    fetchProjects()
  }, [])

  const { Name, Description, ProjectId } = task;
  return (
    <main className='create-page'>
      <header>
        <h1>Create Task</h1>
        <nav>
          <ul>
            <li>
              <Link to='/tasks/create-task'>
                Create task
              </Link>
            </li>
            <li>
              <Link to='/projects/create-project'>
                Create project
              </Link>
            </li>
            <li>
              <Link to='/tasks'>
                Tasks
              </Link>
            </li>
            <li>
              <Link to='/projects'>
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section>
        <form>
          <div>
            <input
              type="text"
              placeholder='Task name'
              value={task.Name}
              onChange={({target}) => {
                setTask({
                  ...task,
                  Name: target.value,
                })
              }}
            />
          </div>
          <div>
            <textarea
              type="text"
              placeholder='Description'
              value={task.Description}
              onChange={({target}) => {
                setTask({
                  ...task,
                  Description: target.value,
                })
              }}
            />
          </div>
          <div>
            <select
              value={task.ProjectId}
              onChange={({target}) => {
                setTask({
                  ...task,
                  ProjectId: target.value
                })
              }}
            >
              <option value="">--select a project--</option>
              {
                projects.length > 0 && (
                  projects.map((project) => (
                    <option key={project.Name} value={project._id}>{project.Name}</option>

                  ))
                )
              }
            </select>
          </div>
            {
              notification.warning.length > 0 && (
                <p className='warning'>{ notification.warning }</p>
              )
            }
            {
              notification.success.length > 0 && (
                <p className='success'>{ notification.success }</p>
              )
            }
          <div>
            <button
              type='submit'
              disabled={
                Name.length < 3 ||
                Description.length < 3 ||
                ProjectId.length < 36}
              onClick={(event) => stopSubmit(event)}
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateTask
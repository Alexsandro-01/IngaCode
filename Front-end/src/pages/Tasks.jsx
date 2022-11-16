import {Link, useNavigate} from 'react-router-dom'
import context from '../context/AppContext'
import {useEffect, useContext, useState} from 'react'
import {getUserOnStorage} from '../services/sessionStorage'
import {requestTasks, requestTime} from '../services/services'
import TaskCard from '../components/TaskCard'

function Tasks() {
  const {tasks, setTasks} = useContext(context)
  const [time, setTime] = useState({})
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
    setTasks(response)
  }
  
  async function fetchTime() {
    const token = getUserOnStorage();
    const response = await requestTime(token)

    setTime(response)
  }

  useEffect(() => {
    fetchTasks()
  }, [])
  
  useEffect(() => {
    fetchTime()
  }, [tasks])
  const {today, month} = time;
  return(
    <main className='create-page'>
      <header>
        <h1>Tasks</h1>
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
      <>
        {
          Object.prototype.hasOwnProperty.call(time, 'today') && (
            <section>
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
                Time this month until today:
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
        {
          tasks.length > 0 && (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
              />
            ))
          )
        }
      </>
    </main>
  )
}

export default Tasks

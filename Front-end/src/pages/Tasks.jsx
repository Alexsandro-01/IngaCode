import {Link, useNavigate} from 'react-router-dom'
import context from '../context/AppContext'
import {useEffect, useContext, useState} from 'react'
import {getUserOnStorage} from '../services/sessionStorage'
import {requestTasks, requestTime} from '../services/services'
import TaskCard from '../components/TaskCard'
import Header from '../components/Header'

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
        <div className='container'>
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
          {
          tasks.length === 0 && (
            <section>
              <p>There are no tasks. Let's go to <Link to='/tasks/create-task'>create one</Link></p>
            </section>
          )
        }
        </div>
    </main>
  )
}

export default Tasks

import {Link, useNavigate} from 'react-router-dom'
import context from '../context/AppContext'
import {useEffect, useContext} from 'react'
import {getUserOnStorage} from '../services/sessionStorage'
import {requestTasks} from '../services/services'

function Tasks() {
  const {tasks, setTasks} = useContext(context)
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

  useEffect(() => {
    fetchTasks()
  }, [])
  return(
    <main>
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
      <section>
        
      </section>
    </main>
  )
}

export default Tasks

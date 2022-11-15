import {Link, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {getUserOnStorage} from '../services/sessionStorage'

function Projects() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = getUserOnStorage();

    if (!token) {
      navigate('/');
    }
  }, [])
  return (
    <main>
      <header>
        <h1>Projects</h1>
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
    </main>
  )
}

export default Projects
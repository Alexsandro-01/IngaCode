import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useContext,} from 'react'
import context from '../context/AppContext' 
import {getUserOnStorage} from '../services/sessionStorage'
import {requestProjects} from '../services/services'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  const {projects, setProjects} = useContext(context)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getUserOnStorage();

    if (!token) {
      navigate('/');
    }
  }, [])

  async function fetchProjects() {
    const token = getUserOnStorage();

    const response = await requestProjects(token)

    setProjects(response);
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <main className='create-page'>
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
      <>
        {
          projects.length > 0 && (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} fetchProjects={fetchProjects}/>
            ))
          )
        }
        {
          projects.length === 0 && (
            <section>
              <p>There are no projects. Let's go to <Link to='/projects/create-project'>create one</Link></p>
            </section>
          )
        }
      </>
    </main>
  )
}

export default Projects
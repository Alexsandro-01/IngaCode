import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useContext,} from 'react'
import context from '../context/AppContext' 
import {getUserOnStorage} from '../services/sessionStorage'
import {requestProjects} from '../services/services'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'

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
      <Header title='Projects' />
      <div className='container'>
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
      </div>
    </main>
  )
}

export default Projects
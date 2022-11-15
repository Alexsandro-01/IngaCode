import { useState } from 'react'
import { requestUpdateProject } from '../services/services'
import { getUserOnStorage } from '../services/sessionStorage'
import '../styles/projectCard.css'

function ProjectCard({ project, fetchProjects }) {
  const [view, setView] = useState(true)
  const [name, setName] = useState(project.Name)
  const [notification, setNotification] = useState({
    warning: '',
    success: ''
  });

  async function updateProject() {
    const token = getUserOnStorage();

    const response = await requestUpdateProject(
      { Name: name },
      project._id,
      token
    );

    if (response.status === 204) {
      setNotification({success: 'updated', warning: ''});
      
      fetchProjects()
      setView(!view)
      
      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }

  return (
    <section className='project-card'>
      <div style={{ display: view ? 'block' : 'none' }}>
      <h3>{project.Name}</h3>
      </div>
      <div style={{ display: !view ? 'block' : 'none' }}>
      <input
        type='text'
        
        value={name}
        onChange={(event) => {
          setName(event.target.value)
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
            <button
              type='button'
              onClick={(event) => {
                setView(!view)
              }}
            >
              update
            </button>
          )
        }
        {
          !view && (
            <button
              type='button'
              onClick={(event) => {
                updateProject()
              }}
            >
              send
            </button>
          )
        }
        <button
          className='danger'  
        >delete</button>
      </div>
    </section>
  )
}

export default ProjectCard
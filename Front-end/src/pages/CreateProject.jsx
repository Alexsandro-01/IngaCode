import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getUserOnStorage} from '../services/sessionStorage'
import {requestCreateProject} from '../services/services'
import '../styles/createPages.css'
import Header from '../components/Header'

function CreateProject() {
  const [project, setProject] = useState({
    Name: ''
  })
  const [notification, setNotification] = useState({
    warning: '',
    success: ''
  });

  const navigate = useNavigate()

  async function stopSubmit(event) {
    event.preventDefault();
    const token = getUserOnStorage();

    const data = {
      Name: project.Name,
    }

    const response = await requestCreateProject(data, token);

    if (response.status === 204) {
      setNotification({success: 'created', warning: ''});

      setProject({Name: ''})

      setTimeout(() => {
        setNotification({ success: '', warning: '' })
      }, 3000);
    } else {
      const { message } = await response.json()
      setNotification({success: '', warning: message});
    }
  }


  useEffect(() => {
    const token = getUserOnStorage();

    if (!token) {
      navigate('/');
    }
  }, [])

  return (
    <main className='create-page'>
      <Header title='Create Project'/>
      <section className='container'>
        <form>
          <div>
            <input
              type="text"
              placeholder='Project name'
              value={project.Name}
              onChange={({target}) => {
                setProject({
                  Name: target.value,
                })
              }}
            />
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
              disabled={ project.Name.length < 3 }
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

export default CreateProject
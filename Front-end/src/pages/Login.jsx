import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {requestLogin} from '../services/services'
import {setUserOnStorage} from '../services/sessionStorage'
import '../styles/login.css'

function Login() {
  const [loginState, setLoginState] = useState({
    UserName: '',
    Password: '',
    disabled: true
  });
  const [warning, setWarning] = useState({
    message: '',
  });

  const {UserName, Password, disabled} = loginState;
  const navigate = useNavigate()

  function validation() {
    const { UserName, Password } = loginState;

    if (UserName.length < 3 || Password.length < 6) {
      setLoginState({ ...loginState, disabled: true});
    } else {
      setLoginState({ ...loginState, disabled: false});
    }
  }

  async function stopSubmit(event) {
    event.preventDefault();

    const data = {
      UserName,
      Password
    }

    const user = await requestLogin(data);
    
    if (user.message) {
      setWarning({ message: user.message});
    } else {
      setWarning({ message: ''});
      setUserOnStorage(user.token)

      navigate('/tasks')
    }
  }

  useEffect(() => {
    validation()
  }, [UserName, Password])

  return(
    <main className='login-page'>
      <section>
        <h1>Login</h1>
        <form>
          <div>
            <input
              type="text"
              placeholder='UserName'
              value={ UserName }
              onChange={ ({ target }) => {
                setLoginState({ ...loginState, UserName: target.value });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder='Password'
              value={ Password }
              onChange={ ({ target }) => {
                setLoginState({ ...loginState, Password: target.value });
              }}
            />
          </div>
            {
              warning.message.length > 0 && (
                <p className='warning'>{ warning.message }</p>
              )
            }
          <div>
            <button
              type='submit'
              disabled={ disabled }
              onClick={ (event) => stopSubmit(event)}
            >Enter</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login;
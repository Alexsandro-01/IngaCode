import {Link} from 'react-router-dom'
function Header({title}) {
  return (
    <header>
      <h1>{title}</h1>
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
  )
}

export default Header
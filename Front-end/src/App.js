import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import CreateTask from './pages/Createtasks';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import AppProvider from './context/AppProvider'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login />} />
          <Route path='/tasks' element={ <Tasks />} />
          <Route path='/projects' element={ <Projects />} />
          <Route path='/projects/create-project' element={ <CreateProject />} />
          <Route path='/tasks/create-task' element={ <CreateTask />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

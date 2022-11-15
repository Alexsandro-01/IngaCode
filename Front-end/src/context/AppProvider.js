import { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [state, setState] = useState({});
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  const context = {
    state,
    tasks,
    projects,
    setTasks,
    setState,
    setProjects,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

export default AppProvider;

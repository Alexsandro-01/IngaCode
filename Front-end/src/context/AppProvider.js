import { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [state, setState] = useState({});
  const [tasks, setTasks] = useState([])

  const context = {
    state,
    tasks,
    setTasks,
    setState,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

export default AppProvider;

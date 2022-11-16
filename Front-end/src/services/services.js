export async function requestLogin(data) {
  const url = 'http://localhost:3001/login';

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  const user = await response.json();
  return user;
};

export async function requestCollaborators(token) {
  const url = 'http://localhost:3001/collaborators'

  const obj = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    }
  }

  const response = await fetch(url, obj);

  const collaborators = await response.json()
  return collaborators;
}

export async function requestCreateProject(data, token) {
  const url = 'http://localhost:3001/projects/create';

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestUpdateProject(data, projectId, token) {
  const url = `http://localhost:3001/projects/update/${projectId}`;

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestDeleteProject(projectId, token) {
  const url = `http://localhost:3001/projects/delete/${projectId}`;

  const obj = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestProjects(token) {
  const url = 'http://localhost:3001/projects/get'

  const obj = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    }
  }

  const response = await fetch(url, obj);

  const projects = await response.json()
  return projects;
}

export async function requestTasks(token) {
  const url = 'http://localhost:3001/tasks/get'

  const obj = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    }
  }

  const response = await fetch(url, obj);

  const tasks = await response.json()
  return tasks;
}

export async function requestCreateTask(data, token) {
  const url = 'http://localhost:3001/tasks/create';

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestUpdateTask(data, taskId, token) {
  const url = `http://localhost:3001/tasks/update/${taskId}`;

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestDeleteTask(taskId, token) {
  const url = `http://localhost:3001/tasks/delete/${taskId}`;

  const obj = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestCreateTimeTracker(data, token) {
  const url = 'http://localhost:3001/timetrackers/create';

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestUpdateTimeTracker(
  data,
  timetrackerId,
  token
  ) {
  const url = `http://localhost:3001/timetrackers/update/${timetrackerId}`;

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestDeleteTimeTracker(timetrackerId, token) {
  const url = `http://localhost:3001/timetrackers/delete/${timetrackerId}`;

  const obj = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }
  
  const response = await fetch(url, obj);
  
  return response;
};

export async function requestTime(token) {
  const url = `http://localhost:3001/timetrackers/get-time`;

  const obj = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }
  
  const response = await fetch(url, obj);

  const time = await response.json()
  
  return time;
};


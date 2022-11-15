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


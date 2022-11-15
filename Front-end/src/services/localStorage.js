export function setUserOnStorage(token) {
  localStorage.setItem('token', token)
}

export function getUserOnStorage() {
  const token = localStorage.getItem('token');

  return token;
}

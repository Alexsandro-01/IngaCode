export function setUserOnStorage(token) {
  sessionStorage.setItem('token', token)
}

export function getUserOnStorage() {
  const token = sessionStorage.getItem('token');

  return token;
}

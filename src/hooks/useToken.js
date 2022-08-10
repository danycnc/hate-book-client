function useToken() {
  const token =
    JSON.parse(localStorage.getItem('token')) ||
    JSON.parse(sessionStorage.getItem('token'));

  return token;
}

export default useToken;

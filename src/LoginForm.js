import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useToken from './hooks/useToken';

const LoginForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [reqStatus, setReqStatus] = useState('');
  const [messageInfo, setMessageInfo] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const token = useToken();

  // check if loggin session already exists and redirect to profile page if so
  useEffect(() => {
    checkLogginSession();
  }, []);

  // at every input fields changes it check if log btn should be enalbed and reset info label
  useEffect(() => {
    enableLoginButton();
    setMessageInfo();
  }, [data]);

  // show massage error if username or pwd are invalid
  useEffect(() => {
    setMessageInfo(reqStatus.message);
  }, [reqStatus]);

  // if fetch response is a token then save it in browser storage and load profile page
  useEffect(() => {
    reqStatus.token && redirect();
  }, [reqStatus]);

  // save token in session or local storage then redirect to profile page
  function redirect() {
    sessionStorage.setItem('token', JSON.stringify(reqStatus.token));
    data.remember &&
      localStorage.setItem('token', JSON.stringify(reqStatus.token));

    navigate('/profile');
  }

  // if token alredy exists then redirect on profile page
  function checkLogginSession() {
    token && navigate('/profile');
  }

  function handleInputChange(event) {
    const { name, type, value, checked } = event.target;
    setData((data) => {
      return {
        ...data,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function handleSpacebar(event) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  function handleEnter(event) {
    if (event.keyCode === 13 && isDisabled === false) {
      submit();
    }
  }

  function submit() {
    setReqStatus('');

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setReqStatus(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // enable login button only if username and pwd are given
  function enableLoginButton() {
    for (let key in data) {
      if (data[key] === '') {
        setIsDisabled(true);
        return;
      }
    }
    setIsDisabled(false);
  }

  return (
    <div>
      <Link to='/'>Back to home</Link> | <Link to='/signup'>Sign-Up</Link>
      <div className='form' onKeyDown={handleEnter}>
        <h2>Login</h2>
        <label>
          Username:
          <input
            onChange={handleInputChange}
            onKeyDown={handleSpacebar}
            name='username'
            value={data.username}></input>
        </label>
        <label>
          Password:
          <input
            type='password'
            onChange={handleInputChange}
            onKeyDown={handleSpacebar}
            name='password'
            value={data.password}></input>
        </label>
        <label>
          Keep me logged in:
          <input
            type='checkbox'
            onChange={handleInputChange}
            name='remember'
            checked={data.remember}></input>
        </label>

        <span className={(messageInfo || state) && 'info'}>
          {messageInfo || state?.message}
        </span>
        <button className='submitBtn' onClick={submit} disabled={isDisabled}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

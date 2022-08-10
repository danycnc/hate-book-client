import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SignUpForm() {
  const navigate = useNavigate();
  const [reqStatus, setReqStatus] = useState();
  const [errorStatus, setErrorStatus] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [statusCode, setStatusCode] = useState();
  const [data, setData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    city: '',
    address: '',
    gender: 'male',
    age: '',

    remember: false,
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  function handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    setData((data) => {
      return {
        ...data,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function handleConfirmPassword(event) {
    const confirm = event.target.value;
    setConfirmPassword(confirm);
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

  useEffect(() => {
    setReqStatus('');
  }, [data]);

  useEffect(() => {
    dataFormValidation();
  }, [data, confirmPassword]);

  const dataFormValidation = () => {
    for (let key in data) {
      if (key !== 'address' && data[key] === '') {
        setErrorStatus('Fields with * are mandatory');
        setIsDisabled(true);
        return;
      }
    }

    if (data.age.match(/[^0-9]/) || data.age < 15 || data.age > 99) {
      setErrorStatus('Must be a number between 15 and 99');
      setIsDisabled(true);
      return;
    }

    if (data.password.length < 8) {
      setErrorStatus(
        'Password too short, minimum 8 characters, numbers and symbol'
      );
      setIsDisabled(true);
      return;
    }

    if (confirmPassword !== data.password) {
      setErrorStatus('Password not match');
      setIsDisabled(true);
      return;
    }

    if (!data.email.match(/\S+@\S+\.\S+/)) {
      setErrorStatus('Invalid email');
      setIsDisabled(true);
      return;
    }
    setErrorStatus('');
    setIsDisabled(false);
    return;
  };

  const submit = () => {
    setReqStatus('');

    fetch('http://localhost:3000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.text();
        setStatusCode(response.status);
      })
      .then((data) => setReqStatus(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (statusCode === 200) {
      navigate('/login', {
        state: {
          message: 'You have registered successfully, please login',
        },
      });
    }
  }, [statusCode]);

  return (
    <div>
      <Link to='/'>Back to home</Link> | <Link to='/login'>Login</Link>
      <div className='form' onKeyDown={handleEnter}>
        <h2>Sign-Up</h2>
        <label>
          Name*:
          <input
            onChange={handleInputChange}
            // onKeyDown={handleSpacebar}
            name='name'
            value={data.name}></input>
        </label>
        <label>
          Surname*:
          <input
            onChange={handleInputChange}
            // onKeyDown={handleSpacebar}
            name='surname'
            value={data.surname}></input>
        </label>
        <label>
          Username*:
          <input
            onChange={handleInputChange}
            onKeyDown={handleSpacebar}
            name='username'
            value={data.username}></input>
        </label>
        <section className='small-input'>
          <label>
            Gender*:
            <select
              className='select'
              onChange={handleInputChange}
              name='gender'
              value={data.gender}>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
              <option value={'strange'}>Strange</option>
            </select>
          </label>
          <label>
            Age*:
            <input
              onChange={handleInputChange}
              onKeyDown={handleSpacebar}
              name='age'
              value={data.age}></input>
          </label>
        </section>
        <label>
          Password*:
          <input
            type='password'
            onChange={handleInputChange}
            onKeyDown={handleSpacebar}
            name='password'
            value={data.password}></input>
        </label>
        <label>
          Confirm password*:
          <input
            type='password'
            onChange={handleConfirmPassword}
            onKeyDown={handleSpacebar}
            name='confirm_password'
            value={confirmPassword}></input>
        </label>
        <label>
          Email*:
          <input
            type='email'
            onChange={handleInputChange}
            onKeyDown={handleSpacebar}
            name='email'
            value={data.email}></input>
        </label>
        <label>
          City*:
          <input
            onChange={handleInputChange}
            name='city'
            value={data.city}></input>
        </label>
        <label>
          Address:
          <input
            onChange={handleInputChange}
            name='address'
            value={data.address}></input>
        </label>

        {/* <label>
          Remember:
          <input
            onChange={handleInputChange}
            onKeyDown={handleSpacebar}
            name='remember'
            checked={data.remember}
            type='checkbox'></input>
        </label> */}

        <span className={(errorStatus || reqStatus) && 'info'}>
          {errorStatus || reqStatus}
        </span>
        <button className='submitBtn' onClick={submit} disabled={isDisabled}>
          Sign-In
        </button>
      </div>
    </div>
  );
}

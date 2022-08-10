import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditUserForm = ({ close }) => {
  const navigate = useNavigate();
  const [reqStatus, setReqStatus] = useState();
  const [errorStatus, setErrorStatus] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledRefreshBtn, setIsDisabledRefreshBtn] = useState(true);
  const [statusCode, setStatusCode] = useState();
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.userDataSlicer);

  const [data, setData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    city: '',
    address: '',
    gender: '',
    age: '',
  });

  // load data from Profile.js page
  useEffect(() => {
    setData({
      name: user?.name,
      surname: user?.surname,
      username: user?.username,
      email: user?.email,
      city: user?.city,
      address: user?.address,
      gender: user?.gender,
      age: user?.age,
    });
  }, [user]);

  // reset label if an input change or if password is reinserted after error
  useEffect(() => {
    setReqStatus('');
  }, [data, password]);

  // call data validation every time data or password change
  useEffect(() => {
    dataFormValidation();
  }, [data, password]);

  // switch from "Save change" to "Reload" when changes success
  useEffect(() => {
    if (statusCode === 200) {
      setIsDisabledRefreshBtn(false);
    }
  }, [statusCode]);

  // handle all input fields but password
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

  function dataFormValidation() {
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
    if (!password) {
      setErrorStatus('Insert password to save changes');
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
  }

  function submit() {
    setReqStatus('');

    fetch(`http://localhost:3000/user/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data, password: password }),
    })
      .then((response) => {
        setStatusCode(response.status);
        return response.json();
      })
      .then((data) => setReqStatus(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function reload() {
    navigate(0);
  }

  return (
    <div>
      <div className='form edit' onKeyDown={handleEnter}>
        <button className='closeBtn' onClick={() => close()}>
          <i className='fa-solid fa-xmark'></i>
        </button>
        <h2>Modify your Data</h2>
        <span>(Due to our policy, you cannot modify username)</span>
        <label>
          Name*:
          <input
            onChange={handleInputChange}
            name='name'
            value={data.name}></input>
        </label>
        <label>
          Surname*:
          <input
            onChange={handleInputChange}
            name='surname'
            value={data.surname}></input>
        </label>
        <label>
          Username:
          <input
            disabled={true}
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
        <label>
          Password to save changes*:
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            onKeyDown={handleSpacebar}
            value={password}></input>
        </label>

        <span className={(errorStatus || reqStatus) && 'info'}>
          {errorStatus || reqStatus?.message}
        </span>
        {!isDisabledRefreshBtn && (
          <button className='reload' onClick={reload}>
            Reload to apply changes
          </button>
        )}
        {isDisabledRefreshBtn && (
          <button className='submitBtn' onClick={submit} disabled={isDisabled}>
            Save changes
          </button>
        )}
      </div>
    </div>
  );
};
export default EditUserForm;

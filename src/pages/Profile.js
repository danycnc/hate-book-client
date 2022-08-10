import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import jwt_decode from 'jwt-decode';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { userSlicer } from '../slicers/userDataSlicer';
import useToken from '../hooks/useToken';
import fetchPosts from '../hooks/fetchAllPosts';

const Profile = () => {
  const navigate = useNavigate();
  const [editIsVisible, setEditIsVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDataSlicer);
  const token = useToken();
  // const uid = jwt_decode(token);

  let uid;
  token && (uid = jwt_decode(token));
  // if (token) {
  //   uid = jwt_decode(token);
  // }

  useEffect(() => {
    if (!token || null) {
      navigate('/login');
      return;
    }
    dispatch(getData());
    dispatch(fetchPosts(token));
  }, []);

  function getData() {
    return (dispatch) => {
      fetch(`http://https://hate-bk-svr.herokuapp.com//users/${uid.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            throw Error('Invalid session. You have been logged out');
          }
          return response.json();
        })
        .then((data) => {
          dispatch(userSlicer.actions.populate(data));
        })
        .catch((error) => logout(error.message));
    };
  }

  const showEdit = () => setEditIsVisible(!editIsVisible);

  function logout(message) {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(userSlicer.actions.reset());
    navigate('/login', { state: { message: message } });
  }

  return (
    <div>
      <div className='sideBySide'>
        <Sidebar
          children={
            <div className='sidebar-btn-cnt'>
              <button onClick={showEdit}>
                <i className='fa-solid fa-user-pen'></i> Edit Data
              </button>
              <button onClick={() => logout('Logged out successfully')}>
                <i className='fa-solid fa-arrow-right-from-bracket'></i> Log Out
              </button>
            </div>
          }
        />
        <Feed />
      </div>

      {user && editIsVisible && <EditUserForm close={showEdit} />}
    </div>
  );
};

export default Profile;

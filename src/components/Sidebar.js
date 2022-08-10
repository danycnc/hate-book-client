import { useState } from 'react';
import { useSelector } from 'react-redux';
import userLogo from '../assets/user.png';
import useToken from '../hooks/useToken';

const Sidebar = ({ children }) => {
  const [reqStatus, setReqStatus] = useState();
  const [showEditImageBtn, setShowEditImageBtn] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [file, setFile] = useState();
  const user = useSelector((state) => state.userDataSlicer);
  const token = useToken();

  const resetModal = () => {
    setShowAvatarModal(!showAvatarModal);
    setFile();
    setReqStatus();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function uploadPhoto(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', user?.username);
    formData.append('image', file);
    fetch(`http://localhost:3000/photo/upload/${user?.id}`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setReqStatus(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='sidebar'>
      <h1>Hello {user?.username}</h1>
      <div
        className='avatar-cnt'
        onMouseEnter={() => setShowEditImageBtn(true)}
        onMouseLeave={() => setShowEditImageBtn(false)}>
        {showEditImageBtn && (
          <button className='editAvatar' onClick={resetModal}>
            <i className='fa-solid fa-camera'></i>
          </button>
        )}

        {showAvatarModal && (
          <div className='avatarModal'>
            <button
              className='closeBtn'
              onClick={() => setShowAvatarModal(false)}>
              <i className='fa-solid fa-xmark'></i>
            </button>
            <h2>Change avatar</h2>
            <form>
              <input
                type='file'
                name='image'
                onChange={handleFileChange}
                accept='image/*'
              />
              <button type='submit' onClick={uploadPhoto}>
                Load Image
              </button>
            </form>
            {reqStatus && <span>{reqStatus.message}</span>}
          </div>
        )}

        <img
          src={
            (user?.image_profile &&
              `http://localhost:3000/profile/${user?.image_profile}`) ||
            userLogo
          }
          alt='user'
          width={100}
        />
      </div>
      <p>Name: {user?.name}</p>
      <p>Surname: {user?.surname}</p>
      <div className='control-pannel'>{children}</div>
    </div>
  );
};

export default Sidebar;

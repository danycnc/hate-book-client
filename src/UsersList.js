import { useState } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    fetch('http://https://hate-bk-svr.herokuapp.com//users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button onClick={getUsers}>Users</button>
      {users.map((user) => (
        <li key={user.username}>
          {user.username} --- {user.email}
        </li>
      ))}
    </div>
  );
};

export default UsersList;

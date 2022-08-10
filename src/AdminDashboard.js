import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [usersList, setUsersList] = useState([]);

  const getUsers = () => {
    fetch('https://hate-bk-svr.herokuapp.com/users')
      .then((response) => response.json())
      .then((data) => setUsersList(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.address}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

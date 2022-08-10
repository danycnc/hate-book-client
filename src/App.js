import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import LoginForm from './LoginForm';
import { SignUpForm } from './SignUpForm';
import UsersList from './UsersList';

function App() {
  return (
    <div>
      <div className='welcome'>
        <h1>Welcome</h1>
        <section>
          <Link to='login'>
            <button>Login</button>
          </Link>
          <Link to='signup'>
            <button>Sign-Up</button>
          </Link>
        </section>
      </div>

      {/* <UsersList /> */}
    </div>
  );
}

export default App;

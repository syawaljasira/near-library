import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, userSignOut }) => {
  return (
    <nav className="flex justify-between p-4 bg-indigo-300">
      <div className="ml-5 text-xl">Book Tracker</div>
      <ul className="flex space-x-4 mr-5">
        <li className="border-b border-indigo-300 hover:border-black">
          <Link to="/">Home</Link>
        </li>
        <li className="border-b border-indigo-300 hover:border-black">
          <Link to="/library">Library</Link>
        </li>
        {currentUser ? (
          <li className="border-b border-indigo-300 hover:border-black">
            <button onClick={userSignOut}>Logout</button>
          </li>
        ) : (
          <li className="border-b border-indigo-300 hover:border-black">
            <Link to="/signin">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

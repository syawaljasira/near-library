import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, userSignOut }) => {
  return (
    <nav className="w-full flex absolute bg-blue-900 text-blue-100 justify-between p-4">
      <div className="ml-5 text-xl font-serif font-semibold">
        <Link to="/">Near Library</Link>
      </div>
      <ul className="flex space-x-6 mr-5">
        <li className="border-b border-blue-900 hover:border-blue-100 transition-all duration-300">
          <Link to="/">Home</Link>
        </li>
        <li className="border-b border-blue-900 hover:border-blue-100 transition-all duration-300">
          <Link to="/library">Library</Link>
        </li>
        {currentUser ? (
          <li className="border-b border-blue-900 hover:border-blue-100 transition-all duration-300">
            <button onClick={userSignOut}>Sign Out</button>
          </li>
        ) : (
          <li className="border-b border-blue-900 hover:border-blue-100 transition-all duration-300">
            <Link to="/signin">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

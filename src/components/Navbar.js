import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-indigo-300">
      <div className="ml-5 text-xl">Book Tracker</div>
      <ul className="flex space-x-4 mr-5">
        <li className="border-b border-indigo-300 hover:border-black">Home</li>
        <li className="border-b border-indigo-300 hover:border-black">
          Category
        </li>
        <li className="border-b border-indigo-300 hover:border-black">Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;

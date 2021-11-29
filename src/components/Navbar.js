import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';
import classNames from 'classnames';

const Navbar = ({ currentUser, userSignOut }) => {
  const [offcanvas, setOffcanvas] = React.useState(false);

  return (
    <>
      <nav className="w-full flex absolute bg-blue-900 text-blue-100 justify-between p-4">
        <div className="ml-5 text-xl font-serif font-semibold">
          <Link to="/">Near Library</Link>
        </div>
        <ul className="hidden md:flex space-x-6 mr-5">
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
        <div className="block md:hidden mr-2">
          <div
            onClick={() => setOffcanvas(true)}
            className="text-2xl flex justify-end px-5 duration-300"
          >
            <FiMenu className="hover:bg-gray-700" />
          </div>
        </div>
      </nav>

      <div
        className={classNames(
          'fixed flex flex-col z-20 h-full w-full top-0 text-white bg-blue-900 md:hidden transition-all duration-500',
          offcanvas ? 'right-0' : '-right-full'
        )}
      >
        <div className="text-2xl w-full pt-8 pr-8 flex justify-end text-right duration-300">
          <span onClick={() => setOffcanvas(false)}>
            <FiX />
          </span>
        </div>
        <span className="text-lg w-full mt-24 py-3 text-center hover:bg-green-850 duration-300">
          <Link to="/">Home</Link>
        </span>
        <span className="text-lg w-full py-3 text-center hover:bg-green-850 duration-300">
          <Link to="/blog">Library</Link>
        </span>
        <span className="text-lg w-full py-3 text-center hover:bg-green-850 duration-300">
          {currentUser ? (
            <button onClick={userSignOut}>Sign Out</button>
          ) : (
            <button>
              <Link to="/signin">Sign In</Link>
            </button>
          )}
        </span>
      </div>
    </>
  );
};

export default Navbar;

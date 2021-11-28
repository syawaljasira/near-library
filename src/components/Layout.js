import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, currentUser, userSignOut }) => {
  return (
    <>
      <Navbar userSignOut={userSignOut} currentUser={currentUser} />
      <div className="min-h-layout">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ userSignIn, currentUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className="h-layout mb-16 text-gray-800 flex items-center text-center justify-center">
      <div className="w-5/12 flex flex-wrap justify-center border border-gray-200 shadow-lg rounded-xl overflow-hidden">
        <h1 className="w-full text-4xl py-4 text-blue-100 bg-blue-700">
          Near Library
        </h1>
        <span className="w-full my-8 text-xl text-center">
          Please sign in first with your Near Account.
        </span>
        <button
          className="w-1/5 font-bold bg-blue-700 hover:bg-blue-800 text-white mb-5 shadow-lg py-2 px-5 rounded-md"
          onClick={userSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;

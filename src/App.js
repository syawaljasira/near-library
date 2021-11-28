import React, { useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/home';
import Library from './components/library';
import SignIn from './components/signIn';
import BookDetails from './components/BookDetails';
import BookByList from './components/BookByList';
import { useDispatch } from 'react-redux';
import {
  addReadListFail,
  addReadListRequest,
  addReadListSuccess,
  deleteReadListFail,
  deleteReadListRequest,
  deleteReadListSuccess,
} from './redux/slices/readLists';

function App({ contract, currentUser, nearConfig, wallet }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userSignIn = () => {
    wallet.requestSignIn(nearConfig.contractName, 'Near Book Tracker');
  };

  const userSignOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
    navigate('/signin');
  };

  const addBookHandler = async (data) => {
    dispatch(addReadListRequest());
    //

    try {
      const newBook = await contract.add_book({
        book: {
          title: data.title,
          description: data.description,
          image: data.book_image,
          status: 'List',
        },
      });

      dispatch(addReadListSuccess(newBook));
      console.log('Success adding the book');
      navigate('/library');
    } catch (error) {
      dispatch(addReadListFail());
      console.error(error);
    }
  };

  const deleteBookHandler = async (book_id) => {
    dispatch(deleteReadListRequest());

    try {
      await contract.delete_book({ book_id });
      dispatch(deleteReadListSuccess());
      console.log('Success delete the book');
    } catch (error) {
      dispatch(deleteReadListFail());
      console.error(error);
    }
  };

  useEffect(() => {
    if (!wallet.isSignedIn()) {
      navigate('/signin');
    }
  }, [wallet, navigate]);

  return (
    <Layout userSignOut={userSignOut} currentUser={currentUser}>
      <Routes>
        <Route
          element={
            <SignIn
              currentUser={currentUser}
              userSignIn={userSignIn}
              userSignOut={userSignOut}
            />
          }
          path="/signin"
        />
        <Route element={<Home addBookHandler={addBookHandler} />} path="/" />
        <Route
          element={
            <Library
              deleteBookHandler={deleteBookHandler}
              wallet={wallet}
              contract={contract}
            />
          }
          path="/library"
        />
        <Route
          element={<BookByList addBookHandler={addBookHandler} />}
          path="/list/:slug"
        />
        <Route
          element={<BookDetails addBookHandler={addBookHandler} />}
          path="/:list/:slug-:id"
        />
      </Routes>
    </Layout>
  );
}

export default App;

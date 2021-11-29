import React from 'react';

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
  updateReadListFail,
  updateReadListRequest,
  updateReadListSuccess,
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
      window.location.reload();
    } catch (error) {
      dispatch(deleteReadListFail());
      console.error(error);
    }
  };

  const updateBookHandler = async (book, status) => {
    dispatch(updateReadListRequest());

    try {
      await contract.update_book({ book_id: book.book_id, status });
      dispatch(updateReadListSuccess());
      console.log('Success update the book');
      navigate('/library');
      window.location.reload();
    } catch (error) {
      dispatch(updateReadListFail());
      console.error(error);
    }
  };

  return (
    <Layout userSignOut={userSignOut} currentUser={currentUser}>
      <Routes>
        <Route
          element={
            <SignIn
              currentUser={currentUser}
              userSignIn={userSignIn}
              userSignOut={userSignOut}
              wallet={wallet}
            />
          }
          path="/signin"
        />
        <Route
          element={
            <Home currentUser={currentUser} addBookHandler={addBookHandler} />
          }
          path="/"
        />
        <Route
          element={
            <Library
              deleteBookHandler={deleteBookHandler}
              currentUser={currentUser}
              contract={contract}
              updateBookHandler={updateBookHandler}
              wallet={wallet}
            />
          }
          path="/library"
        />
        <Route
          element={
            <BookByList wallet={wallet} addBookHandler={addBookHandler} />
          }
          path="/list/:slug"
        />
        <Route
          element={
            <BookDetails wallet={wallet} addBookHandler={addBookHandler} />
          }
          path="/:list/:slug-:id"
        />
      </Routes>
    </Layout>
  );
}

export default App;

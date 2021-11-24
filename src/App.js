import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksSelector, fetchBooks } from './redux/slices/books';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/home';
import Library from './components/library';
import Login from './components/login';
import BookDetails from './components/BookDetails';

function App() {
  const dispatch = useDispatch();
  const { books, loading, errors } = useSelector(booksSelector);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route
          element={<Home books={books} loading={loading} errors={errors} />}
          path="/"
        />
        <Route element={<Library />} path="/library" />
        <Route element={<Login />} path="/login" />
        <Route element={<BookDetails />} path="/book/:slug" />
      </Routes>
    </Layout>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksSelector, fetchBooks } from './redux/slices/books';

import Layout from './components/Layout';
import RenderBooks from './components/RenderBooks';

function App() {
  const dispatch = useDispatch();
  const { books, loading, errors } = useSelector(booksSelector);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Layout>
      <header>Best Sellers Book List</header>
      <RenderBooks books={books} loading={loading} errors={errors} />
    </Layout>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderBooks from '../components/RenderBooks';
import { booksSelector, fetchBooks } from '../redux/slices/books';

const Home = () => {
  const dispatch = useDispatch();
  const { books, loading, errors } = useSelector(booksSelector);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <header>Best Sellers Book List</header>
      <RenderBooks books={books} loading={loading} errors={errors} />
    </>
  );
};

export default Home;

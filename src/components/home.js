import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RenderBooks from '../components/RenderBooks';
import { booksSelector, fetchBooks } from '../redux/slices/books';

const Home = ({ addBookHandler, currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, loading, errors } = useSelector(booksSelector);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <header className="flex bg-blue-900 text-blue-100 h-layout items-center">
        <img
          src="./images/reading.svg"
          alt="People reading book"
          className="w-3/5 h-2/3"
        />
        <div className="w-2/5 pl-4 pr-8">
          <h1 className="text-4xl font-semibold text-blue-200">Near Library</h1>
          <p className="text-xl mt-5 tracking-wide">
            Let's found some great books from the bestseller books.
          </p>
          <button
            onClick={
              currentUser
                ? () =>
                    document
                      .querySelector('#bestseller-list')
                      .scrollIntoView({ behavior: 'smooth' })
                : () => navigate('/signin')
            }
            className="py-1 px-3 bg-red-500 shadow-lg mt-16 rounded-md"
          >
            Let's Get Started
          </button>
        </div>
      </header>
      <RenderBooks
        addBookHandler={addBookHandler}
        books={books}
        loading={loading}
        errors={errors}
      />
    </>
  );
};

export default Home;

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
      <header className="flex flex-wrap md:flex-nowrap justify-center bg-blue-900 text-blue-100 h-screen md:h-layout items-center pt-10 pb-28 md:pb-0">
        <img
          src="./images/reading.svg"
          alt="People reading book"
          className="w-6/12 sm:mt-10 md:w-3/5 h-2/3"
        />
        <div className="mt-10 md:mt-0 w-9/12 md:w-2/5 md:pl-4 md:pr-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-blue-200">
            Near Library
          </h1>
          <p className="text-lg mt-3 md:mt-5 tracking-wide">
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
            className="py-1 px-3 bg-red-500 shadow-lg mt-6 md:mt-16 rounded-md"
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

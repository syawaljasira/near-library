import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Library = ({ contract, wallet, deleteBookHandler }) => {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      (async function () {
        await contract
          .get_books({
            account_id: wallet.getAccountId(),
            skip: 0,
            limit: 40,
          })
          .then(setBooks)
          .then(() => setLoading(false))
          .catch(() => {
            setBooks(null);
            setLoading(false);
          });
      })();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [contract, wallet, books]);

  console.log(books);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="w-full p-5 flex flex-wrap justify-around">
      {books === null && !loading ? (
        <div>
          Your read list is empty... Back to{' '}
          <Link className="hover:underline" to="/">
            Home
          </Link>
        </div>
      ) : (
        <>
          {books.map((book) => {
            return (
              <div
                className="w-2/12 mx-2 flex my-10 rounded-lg shadow-md border border-gray-200 flex-wrap space-y-2"
                key={book.book_id}
              >
                <div className="w-full text-center h-52 flex px-8 justify-center">
                  <img
                    src={book.image}
                    alt={`book-${book.book_id}`}
                    className="w-auto flex object-fill"
                  />
                </div>
                <div
                  className={classNames(
                    'w-full pb-4 px-2 mt-2 flex flex-col space-y-1',
                    book.description ? 'h-64' : 'h-36 mb-2'
                  )}
                >
                  <span className="w-full font-semibold text-lg hover:underline">
                    {book.title}
                  </span>
                  <span className="w-full text-gray-800 text-sm">
                    {book.description}
                  </span>
                </div>
                <button
                  onClick={() => deleteBookHandler(book.book_id)}
                  className="px-3 text-sm flex items-end py-1 mx-2 rounded-md bg-indigo-400 text-gray-100"
                >
                  <span>Delete</span>
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Library;

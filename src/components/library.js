import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Library = ({
  contract,
  wallet,
  deleteBookHandler,
  updateBookHandler,
}) => {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState('List');

  useEffect(() => {
    if (!wallet.isSignedIn()) {
      navigate('/signin');
    }

    setLoading(true);

    try {
      (async function () {
        await contract
          .get_books({
            account_id: wallet.getAccountId(),
            skip: 0,
            limit: 20,
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
  }, [contract, navigate, wallet]);

  const pageHandler = (pageName) => {
    setPage(pageName);
  };

  console.log(books);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="w-full pt-20 p-5 flex flex-wrap justify-around">
      <div className="w-full flex my-10">
        <div className="w-9/12 lg:w-4/12 border border-gray-300 flex mx-auto bg-gray-200">
          <button
            onClick={() => pageHandler('List')}
            className="w-full py-1 border border-gray-300 hover:bg-gray-300"
          >
            Books
          </button>
          <button
            onClick={() => pageHandler('Read')}
            className="w-full py-1 border border-gray-300 hover:bg-gray-300"
          >
            Reads
          </button>
          <button
            onClick={() => pageHandler('Finished')}
            className="w-full py-1 border border-gray-300 hover:bg-gray-300"
          >
            Finished
          </button>
        </div>
      </div>
      {books !== null && !loading ? (
        <>
          {books.map((book) => {
            return book.status === page ? (
              <div
                className="w-full sm:w-5/12 md:w-3/12 lg:w-2/12 mx-2 flex my-10 rounded-lg shadow-md border border-gray-200 flex-wrap space-y-2"
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
                {page === 'List' ? (
                  <button
                    onClick={() => updateBookHandler(book, 'Read')}
                    className="px-3 text-sm flex items-end py-1 mx-2 rounded-md bg-blue-800 hover:bg-blue-700 text-gray-100"
                  >
                    <span>Read</span>
                  </button>
                ) : page === 'Read' ? (
                  <button
                    onClick={() => updateBookHandler(book, 'Finished')}
                    className="px-3 text-sm flex items-end py-1 mx-2 rounded-md bg-blue-800 hover:bg-blue-700 text-gray-100"
                  >
                    <span>Finished Read</span>
                  </button>
                ) : (
                  <span></span>
                )}
                <button
                  onClick={() => deleteBookHandler(book.book_id)}
                  className="px-3 text-sm flex items-end py-1 ml-auto mr-2 rounded-md bg-red-500 hover:bg-red-400 text-gray-100"
                >
                  <span>Delete</span>
                </button>
              </div>
            ) : (
              <span key={book.book_id}></span>
            );
          })}
        </>
      ) : (
        <div>
          Your read list is empty... Back to{' '}
          <Link className="hover:underline" to="/">
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Library;

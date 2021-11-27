import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import { fetchBookByList } from '../redux/slices/bookByList';
import classNames from 'classnames';
import { MdArrowForwardIos } from 'react-icons/md';
import { fetchBookDetails } from '../redux/slices/bookDetails';

const RenderBooks = ({ books: { results }, loading, errors }) => {
  const dispatch = useDispatch();

  if (loading) {
    return <div>Loading books...</div>;
  }
  if (errors) {
    return <div>Unable to display books</div>;
  }

  console.log(results);

  return (
    <div className="flex p-3 flex-wrap">
      {results &&
        results.lists.map((listBook, index) => {
          return (
            <div
              key={index}
              className="w-full p-5 flex flex-wrap justify-around"
            >
              <div className="w-full py-4 font-semibold">
                <Link
                  to={`list/${listBook.list_name_encoded}`}
                  onClick={() =>
                    dispatch(fetchBookByList(listBook.list_name_encoded))
                  }
                >
                  <div className="flex space-x-2 items-center">
                    <span>{listBook.display_name}</span>
                    <MdArrowForwardIos />
                  </div>
                </Link>
              </div>
              {listBook.books.map((book, idx) => {
                return (
                  <div
                    className="w-2/12 flex rounded-lg shadow-md border border-gray-200 flex-wrap space-y-2"
                    key={idx}
                  >
                    <div className="w-full text-center h-52 flex px-8 justify-center">
                      <img
                        src={book.book_image}
                        alt={`book-${idx}`}
                        className="w-auto flex object-fill"
                      />
                    </div>
                    <div
                      className={classNames(
                        'w-full pb-4 px-2 mt-2 flex flex-col space-y-1',
                        book.description ? 'h-64' : 'h-36 mb-2'
                      )}
                    >
                      <small className="w-full font-light">
                        {book.weeks_on_list === 1
                          ? `NEW THIS WEEK`
                          : book.weeks_on_list === 0
                          ? 'MONTHLY LIST'
                          : `${book.weeks_on_list} WEEKS ON THE LIST`}
                      </small>
                      <Link
                        to={`/${listBook.list_name_encoded}/${slugify(
                          book.title
                        )}-${book.rank}`}
                        onClick={() =>
                          dispatch(fetchBookDetails(listBook.list_name_encoded))
                        }
                      >
                        <span className="w-full font-semibold text-lg hover:underline">
                          {book.title}
                        </span>
                      </Link>
                      <span className="w-full text-sm">{book.contributor}</span>
                      <span className="w-full text-gray-800 text-sm">
                        {book.description}
                      </span>
                    </div>
                    <button className="px-3 text-sm flex items-end py-1 mx-2 rounded-md bg-indigo-400 text-gray-100">
                      <span>Want to read</span>
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default RenderBooks;

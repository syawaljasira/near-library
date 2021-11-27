import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';

import {
  bookByListSelector,
  fetchBookByList,
} from '../redux/slices/bookByList';
import { fetchBookDetails } from '../redux/slices/bookDetails';

const BookByList = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const {
    bookByList: { results },
    loading,
    errors,
  } = useSelector(bookByListSelector);

  useEffect(() => {
    if (!results) {
      dispatch(fetchBookByList(slug));
    }
  }, [dispatch, results, slug]);

  if (loading) {
    return <div>Loading books...</div>;
  }
  if (errors) {
    return <div>Unable to display books</div>;
  }

  console.log(results);

  return results ? (
    <div className="w-full p-5 flex flex-wrap justify-around">
      <div className="w-full mb-10 text-xl font-bold text-gray-800 text-center">
        <span className="border-b-2 border-indigo-300 pb-1 px-3">
          {results.display_name}
        </span>
      </div>
      {results.books.map((book, idx) => {
        return (
          <div
            className="w-2/12 mx-2 flex my-10 rounded-lg shadow-md border border-gray-200 flex-wrap space-y-2"
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
                to={`/${slug}/${slugify(book.title)}`}
                onClick={() => dispatch(fetchBookDetails(slug))}
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
  ) : (
    <span>Undefined book</span>
  );
};

export default BookByList;

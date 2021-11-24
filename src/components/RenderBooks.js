import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import { fetchBookByList } from '../redux/slices/bookByList';

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
    <div className="flex flex-wrap">
      {results &&
        results.lists.map((listBook) => {
          return (
            <div className="w-full p-5 flex flex-wrap justify-center">
              <span className="w-full font-semibold">
                {listBook.display_name}
              </span>
              {listBook.books.map((book, idx) => {
                return (
                  <div className="w-2/12 p-5" key={idx}>
                    <Link
                      to={`/book/${slugify(book.title)}`}
                      onClick={() =>
                        dispatch(
                          fetchBookByList(
                            results.published_date,
                            listBook.list_name_encoded,
                            book.title
                          )
                        )
                      }
                    >
                      <img
                        src={book.book_image}
                        alt={`book-${idx}`}
                        className="w-full"
                      />
                      <span>{book.title}</span>
                    </Link>
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

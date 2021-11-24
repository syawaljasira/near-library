import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';

const RenderBooks = ({ books: { results }, loading, errors }) => {
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
          return listBook.books.map((book, idx) => {
            return (
              <div className="w-3/12 p-5" key={idx}>
                <Link to={`/book/${slugify(book.title)}`}>
                  <img
                    src={book.book_image}
                    alt={`book-${idx}`}
                    className="w-full"
                  />
                  <span>{book.title}</span>
                </Link>
              </div>
            );
          });
        })}
    </div>
  );
};

export default RenderBooks;

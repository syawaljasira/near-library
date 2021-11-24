import React from 'react';
import { useSelector } from 'react-redux';
import { bookByListSelector } from '../redux/slices/bookByList';

const BookDetails = () => {
  const { bookByList, title, loading, errors } =
    useSelector(bookByListSelector);
  console.log(bookByList, title);

  if (loading) {
    return <div>Loading data...</div>;
  }
  if (errors) {
    return <div>Unable to display detail book</div>;
  }

  const detailBook = bookByList.results.books.filter((book, i) => {
    return book.title !== title ? book[i] : {};
  });

  if (bookByList) {
    console.log(detailBook);
  }

  const {
    book_image,
    title: book_title,
    author,
    publisher,
    description,
    book_image_width,
    book_image_height,
  } = detailBook[0];

  return (
    <div className="flex">
      <div className="w-6/12 p-3">
        <img
          src={book_image}
          alt={book_title}
          width={book_image_width}
          height={book_image_height}
          className="mx-auto"
        />
      </div>
      <div className="w-6/12 p-3 flex flex-col space-y-3">
        <h1 className="capitalize">Book Title: {title.toLowerCase()}</h1>
        <span>Author: {author}</span>
        <span>Publisher: {publisher}</span>
        <div>
          <span>Description:</span>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

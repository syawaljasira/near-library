import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  bookDetailsSelector,
  fetchBookDetails,
} from '../redux/slices/bookDetails';

const BookDetails = () => {
  const dispatch = useDispatch();
  const { list, id } = useParams();
  const [detailBook, setDetailBook] = useState(null);
  const { bookDetails, loading, errors } = useSelector(bookDetailsSelector);

  useEffect(() => {
    if (!bookDetails.results) {
      dispatch(fetchBookDetails(list));
    }

    if (bookDetails.results) {
      function getDetail(bookDetails) {
        return bookDetails.results.books.filter((book, i) => {
          return parseInt(id) !== book.rank ? book[i] : {};
        });
      }
      setDetailBook(getDetail(bookDetails));
    }
  }, [dispatch, bookDetails, list, id]);

  if (loading) {
    return <div>Loading data...</div>;
  }
  if (errors) {
    return <div>Unable to display detail book</div>;
  }

  console.log(bookDetails);
  if (!loading && detailBook !== null) {
    const {
      book_image,
      title: book_title,
      author,
      publisher,
      description,
      book_image_width,
      book_image_height,
    } = detailBook[0];

    console.log(detailBook);

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
          <h1 className="capitalize">Book Title: {book_title.toLowerCase()}</h1>
          <span>Author: {author}</span>
          <span>Publisher: {publisher}</span>
          <div>
            <span>Description:</span>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading data...</div>;
  }
};

export default BookDetails;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  bookDetailsSelector,
  fetchBookDetails,
} from '../redux/slices/bookDetails';

const BookDetails = ({ wallet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, id } = useParams();
  const [detailBook, setDetailBook] = useState(null);
  const { bookDetails, loading, errors } = useSelector(bookDetailsSelector);

  useEffect(() => {
    if (!wallet.isSignedIn()) {
      navigate('/signin');
    }

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
  }, [dispatch, bookDetails, list, id, wallet, navigate]);

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
      <div className="flex pt-20">
        <div className="w-6/12 p-3">
          <img
            src={book_image}
            alt={book_title}
            width={book_image_width}
            height={book_image_height}
            className="mx-auto"
          />
        </div>
        <div className="w-4/12 p-3 px-10 flex flex-col space-y-3">
          <h1 className="capitalize text-3xl font-bold text-gray-800">
            Title: {book_title.toLowerCase()}
          </h1>
          <span className="text-xl text-gray-700">Author: {author}</span>
          <span className="text-xl text-gray-700">Publisher: {publisher}</span>
          <div className="text-xl text-gray-700 space-y-2">
            <span>Description Book:</span>
            <p className="font-light">{description}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading data...</div>;
  }
};

export default BookDetails;

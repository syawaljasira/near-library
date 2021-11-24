import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { slug } = useParams();
  return <div>Book detail: {slug}</div>;
};

export default BookDetails;

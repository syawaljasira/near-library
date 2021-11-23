import React from 'react';

const RenderBooks = ({ books: { results }, loading, errors }) => {
  if (loading) {
    return <div>Loading books...</div>;
  }
  if (errors) {
    return <div>Unable to display books</div>;
  }

  console.log(results);
  return (
    <>
      {results &&
        results.map((book, index) => {
          return (
            <div key={index}>
              <span>{book.display_name}</span>
              <span>{book.list_name}</span>
            </div>
          );
        })}
    </>
  );
};

export default RenderBooks;

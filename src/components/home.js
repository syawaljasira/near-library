import React from 'react';
import RenderBooks from './RenderBooks';

const Home = ({ books, loading, errors }) => {
  return (
    <>
      <header>Best Sellers Book List</header>
      <RenderBooks books={books} loading={loading} errors={errors} />
    </>
  );
};

export default Home;

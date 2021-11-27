import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/home';
import Library from './components/library';
import Login from './components/login';
import BookDetails from './components/BookDetails';
import BookByList from './components/BookByList';

function App({ contract, currentUser, nearConfig, walletConnection }) {
  return (
    <Layout>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Library />} path="/library" />
        <Route element={<Login />} path="/login" />
        <Route element={<BookByList />} path="/list/:slug" />
        <Route element={<BookDetails />} path="/:list/:slug-:id" />
      </Routes>
    </Layout>
  );
}

export default App;

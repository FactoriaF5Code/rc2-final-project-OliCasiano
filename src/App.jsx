import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  LoginForm  from './components/LoginForm/LoginForm.jsx';
import  HomePage  from './components/HomePage/Homepage.jsx';

function App () {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/HomePage" element={<HomePage />} />     
    </Routes>
    </BrowserRouter> 
  );
}

export default App;

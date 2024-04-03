import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  LoginForm  from './components/LoginForm/LoginForm.jsx';
import  HomePage  from './components/HomePage/Homepage.jsx';
import RegisterPage from './components/RegisterPage/RegisterPage.jsx';

function App () {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/HomePage" element={<HomePage />} />    
        <Route path="/RegisterPage" element={<RegisterPage />} />   
    </Routes>
    </BrowserRouter> 
  );
}

export default App;

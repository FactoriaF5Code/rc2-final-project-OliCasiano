import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import HomePage from './components/HomePage/Homepage.jsx';
import RegisterPage from './components/RegisterPage/RegisterPage.jsx';
import PerfilUser from './components/PerfilUser/PerfilUser.jsx';
import { AuthenticationProvider } from './authentication/AuthenticationProvider';

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/PerfilUser" element={<PerfilUser />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;

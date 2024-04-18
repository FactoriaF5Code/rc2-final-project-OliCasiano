import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; 
import LoginForm from '../components/LoginForm/LoginForm'; 
import RegisterPage from '../components/RegisterPage/RegisterPage'; 

vi.mock('../authentication/AuthenticationProvider', () => ({
  useAuthenticationContext: () => ({
    login: vi.fn(() => Promise.resolve(true))
  })
}));


const SimpleButton = () => (
  <button>Añadir Post</button>
);

describe('SimpleButton', () => {
  it('renders the submit button', () => {
    render(<SimpleButton />);
    const addButton = screen.getByRole('button', { name: /añadir post/i });
    expect(addButton).toBeInTheDocument();
  });
});

describe('LoginForm', () => {
  it('renders email and password input fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Contraseña/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});

describe('RegisterPage', () => {
  it('renders input fields for registration', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText(/Nombre/i);
    const lastNameInput = screen.getByPlaceholderText(/Apellido/i);
    const passwordInputs = screen.getAllByPlaceholderText(/Contraseña/i);

    expect(nameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(passwordInputs.length).toBe(2); 
    expect(passwordInputs[0]).toBeInTheDocument(); 
    expect(passwordInputs[1]).toBeInTheDocument(); 
  });
});
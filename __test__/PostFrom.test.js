import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para obtener funciones adicionales de jest-dom
import PostForm from './PostForm';

describe('PostForm', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<PostForm />);
    
   
    expect(getByPlaceholderText('Escribe tu publicación aquí...')).toBeInTheDocument();

  });

  it('allows adding a new post', () => {
    const { getByPlaceholderText, getByText } = render(<PostForm />);

    const contentInput = getByPlaceholderText('Escribe tu publicación aquí...');
    fireEvent.change(contentInput, { target: { value: 'Nuevo post de prueba' } });

    const fileInput = getByText('Añadir Imagen').previousElementSibling;
    fireEvent.change(fileInput, { target: { files: [new File(['test.jpg'], 'test.jpg', { type: 'image/jpeg' })] } });

    const addButton = getByText('Añadir Post');
    fireEvent.click(addButton);

    expect(getByText('Nuevo post de prueba')).toBeInTheDocument();
    expect(getByText('test.jpg')).toBeInTheDocument();
  });
});

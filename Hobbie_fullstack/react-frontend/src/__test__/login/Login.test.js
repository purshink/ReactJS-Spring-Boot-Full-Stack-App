import { render, cleanup,screen } from '@testing-library/react';
import Login from '../../components/root/users/login/Login'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

beforeEach(() => render(<Router> <Login /></Router>));
afterEach(cleanup);


it('input should be initially empty', () => {
 
    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");

  
    expect(username.value).toBe("");
    expect(password.value).toBe("");
  
  
  });


  it('change value of input element works correctly', () => {

    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
  
    userEvent.type(username, "patofil");
    expect(username.value).toBe("patofil");
  
    userEvent.type(password, "n66123");
    expect(password.value).toBe("n66123");
  
  
  });

  it('should show error message on invalid input', () => {

    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");

  
    userEvent.type(username, "pat");
    userEvent.type(password, "");

    
  
    const submitBtnElement = screen.getByRole("button", {name: /Login/i});
  
    userEvent.click(submitBtnElement);
    const errorUsername = screen.getByText(/Minimum 4 characters/i);
    const errorPassword = screen.getByText(/Password required/i);
    
  
    expect(errorUsername).toBeInTheDocument();
    expect(errorPassword).toBeInTheDocument();

  });


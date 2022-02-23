import { render, cleanup,screen } from '@testing-library/react';
import PasswordChange from '../../components/root/users/login/forgottenPassword/PasswordChange'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

beforeEach(() => render(<Router> <PasswordChange /></Router>));
afterEach(cleanup);


it('input should be initially empty', () => {
 
    const email = screen.getByLabelText("Your email:");
  
    expect(email.value).toBe("");
  
  });


  it('change value of input element works correctly', () => {

    const email = screen.getByLabelText("Your email:");

    userEvent.type(email, "n66@mail.com");
    expect(email.value).toBe("n66@mail.com");
  
  
  });

  it('should show error message on invalid input', () => {

    const email = screen.getByLabelText("Your email:");
   
    userEvent.type(email, "n66gmail.com");

    const submitBtnElement = screen.getByRole("button", {name: /Submit/i});
  
    userEvent.click(submitBtnElement);
  
    const errorEmail = screen.getByText(/Invalid email address/i);

    expect(errorEmail).toBeInTheDocument();
 
  });
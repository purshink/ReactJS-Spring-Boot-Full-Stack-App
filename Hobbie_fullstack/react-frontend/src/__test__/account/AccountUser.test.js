import { render, cleanup,screen } from '@testing-library/react';
import AccountUser from '../../components/root/users/homeUser/accountUser/AccountUser';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

afterEach(cleanup);

it('renders without crashing', () => {

  render(<Router> <AccountUser /></Router>);

});



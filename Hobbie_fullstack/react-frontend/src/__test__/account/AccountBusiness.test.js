import { render, cleanup,screen } from '@testing-library/react';
import AccountBusiness from '../../components/root/users/homeBusiness/AccountBusiness/AccountBusiness';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

afterEach(cleanup);

it('renders without crashing', () => {

  render(<Router> <AccountBusiness /></Router>);

});



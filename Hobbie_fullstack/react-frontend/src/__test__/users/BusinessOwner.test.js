import { render, cleanup,screen } from '@testing-library/react';
import BusinessOwner from '../../components/root/users/homeBusiness/BusinessOwner';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

afterEach(cleanup);

it('renders without crashing', () => {

  render(<Router> <BusinessOwner/></Router>);

});



import { render, cleanup,screen } from '@testing-library/react';
import TestForm from '../../components/root/users/homeUser/test/TestForm';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

afterEach(cleanup);

it('renders without crashing', () => {

  render(<Router> <TestForm/></Router>);

});



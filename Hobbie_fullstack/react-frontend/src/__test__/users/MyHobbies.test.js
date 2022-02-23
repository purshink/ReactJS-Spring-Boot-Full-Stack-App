import { render, cleanup,screen } from '@testing-library/react';
import MyHobbies from '../../components/root/users/homeUser/MyHobbies';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

afterEach(cleanup);

it('renders without crashing', () => {

  render(<Router> <MyHobbies /></Router>);

});



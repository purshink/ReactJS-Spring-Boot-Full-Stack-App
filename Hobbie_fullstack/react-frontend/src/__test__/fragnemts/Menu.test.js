import { render, screen } from '@testing-library/react';
import Menu from '../../components/root/fragments/header/navbar/mobileMenu/Menu';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



it('renders without crashing', () => {

  render(<Router> <Menu /></Router>);


});
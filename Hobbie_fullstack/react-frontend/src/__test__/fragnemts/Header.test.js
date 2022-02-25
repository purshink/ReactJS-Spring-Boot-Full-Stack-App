import { render, screen } from '@testing-library/react';
import Header from '../../components/root/fragments/header/Header';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { act } from  "react-dom/test-utils";



it('renders without crashing', () => {
  () => render(act(() => (<Router> <Header /></Router>))); 
});
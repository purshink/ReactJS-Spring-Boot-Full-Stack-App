import { render, screen } from '@testing-library/react';
import Footer from '../../components/root/fragments/footer/Footer';
import FooterCover from '../../components/root/fragments/footer/FooterCover';
import FooterHome from '../../components/root/fragments/footer/FooterHome';
import FooterDetails from '../../components/root/fragments/footer/FooterDetails';
import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';



it('footer renders without crashing', () => {

  render(<Router> <Footer /></Router>);


});


it('footerHome renders without crashing', () => {
  
    render(<Router> <FooterHome /></Router>);
  
  });

  it('footerDetails renders without crashing', () => {

    render(<Router> <FooterDetails /></Router>);
  
    expect(screen.getByText(/Hobbie 2022. All rights reserved./i)).toBeInTheDocument();
  
  });

  it('footerCover renders without crashing', () => {

    render(<Router> <FooterCover /></Router>);

    expect(screen.getByText(/Hobbie 2022. All rights reserved./i)).toBeInTheDocument();
  
  });
  
  
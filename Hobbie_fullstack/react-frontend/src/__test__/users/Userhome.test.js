import { render, cleanup, screen } from '@testing-library/react';
import UserHome from '../../components/root/users/homeUser/UserHome';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { shallow } from 'enzyme';
// import Enzyme from 'enzyme'
// import  Adapter from "@wojtekmaj/enzyme-adapter-react-17";



// Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup);


it('renders without crashing', () => {

  render(<Router> <UserHome /></Router>);

});



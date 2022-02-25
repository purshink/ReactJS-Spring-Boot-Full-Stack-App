import { render, cleanup, screen } from '@testing-library/react';
import MyHobbies from '../../components/root/users/homeUser/MyHobbies';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyHobbiesDataService from "../../api/hobby/MyHobbiesDataService"
import mockAxios from "jest-mock-axios";



afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it('should render no saved hobbies', async () => {
  const hobbies = []
  
  mockAxios.get.mockReturnValueOnce(hobbies);

  const result = await MyHobbiesDataService();
  expect(result).toEqual(hobbies);

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`http://localhost:8080/hobbies/saved-hobbies/`);
  expect(result).toEqual([]);

});

it('renders without crashing', () => {

    render(<Router> <MyHobbies /></Router>);

});



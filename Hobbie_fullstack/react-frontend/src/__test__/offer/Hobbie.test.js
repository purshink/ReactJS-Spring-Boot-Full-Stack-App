import { render, cleanup,screen } from '@testing-library/react';
import Hobbie from '../../components/root/users/homeBusiness/Offer/Hobbie';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeleteHobbyService from "../../api/hobby/DeleteHobbyService"
import IsHobbySavedService from "../../api/hobby/IsHobbySavedService"
import SaveHobbyService from "../../api/hobby/SaveHobbyService"
import RemoveHobbyService from "../../api/hobby/RemoveHobbyService"
import mockAxios from "jest-mock-axios";



afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it('should delete hobby successfully', async () => {
  const id = 6;
  
  mockAxios.delete.mockReturnValueOnce(id);

  const result = await DeleteHobbyService(id);

  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  expect(mockAxios.delete).toHaveBeenCalledWith(`http://localhost:8080/hobbies/delete-hobby/6`);
  expect(result).toEqual(6);

});


it('should save hobby successfully', async () => {
        const id = 6;

        mockAxios.get.mockReturnValueOnce(id);
      
        const result = await SaveHobbyService(id);
      
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(`http://localhost:8080/hobbies/save-hobby`,{"params": {"id": 6, "username": ""}});
        expect(result).toEqual(6);
      
});

it('should remove hobby successfully', async () => {
        const id = 6;
        
        mockAxios.get.mockReturnValueOnce(id);
      
        const result = await RemoveHobbyService(id);
      
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(`http://localhost:8080/hobbies/remove-hobby`,{"params": {"id": 6, "username": ""}});
        expect(result).toEqual(6);
      
});

it('should show if hobby is saved successfully', async () => {
        const id = 6;
      
        mockAxios.get.mockReturnValueOnce("true");
      
        const result = await IsHobbySavedService(id);
      
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(`http://localhost:8080/hobbies/is-saved`,{"params": {"id": 6, "username": ""}});
        expect(result).toEqual("true");
      
});



it('renders without crashing', () => {
    
        render(<Router> <Hobbie /></Router>);

});



import { render, cleanup, screen } from "@testing-library/react";
import Hobbie from "../../components/root/users/business/Offer/Hobbie";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeleteHobbyService from "../../api/hobby/DeleteHobbyService";
import IsHobbySavedService from "../../api/hobby/IsHobbySavedService";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("should delete hobby successfully", async () => {
  const id = 6;

  mockAxios.delete.mockReturnValueOnce(id);

  const result = await DeleteHobbyService(id);

  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  expect(mockAxios.delete).toHaveBeenCalledWith("/hobbies/6");
  expect(result).toEqual(6);
});

it("should show if hobby is saved successfully", async () => {
  const id = 6;

  mockAxios.get.mockReturnValueOnce("true");

  const result = await IsHobbySavedService(id);

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`/hobbies/is-saved`, {
    params: { id: 6, username: "" },
  });
  expect(result).toEqual("true");
});

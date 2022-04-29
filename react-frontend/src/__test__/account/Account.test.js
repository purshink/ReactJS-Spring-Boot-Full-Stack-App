import { render, cleanup, screen } from "@testing-library/react";
import AccountBusiness from "../../components/root/users/business/AccountBusiness/AccountBusiness";
import AccountUser from "../../components/root/users/user/accountUser/AccountUser";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeleteUserService from "../../api/users/DeleteUserService";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("should delete account successfully", async () => {
  const id = 6;

  mockAxios.delete.mockReturnValueOnce(id);

  const result = await DeleteUserService(id);

  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  expect(mockAxios.delete).toHaveBeenCalledWith(`/user/6`);
  expect(result).toEqual(6);
});

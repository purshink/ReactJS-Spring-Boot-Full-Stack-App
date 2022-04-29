import { render, cleanup, screen } from "@testing-library/react";
import TestForm from "../../components/root/users/user/test/TestForm";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestResultsService from "../../api/test/TestResultsService";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("should post test results succsessfully", async () => {
  const test = {
    username: "user",
    categoryOne: "ACTIVE",
    categoryTwo: "CREATIVE",
    categoryThree: "SOCIAL",
    categoryFour: "ACTIVE",
    categoryFive: "OTHER",
    categorySix: "INTELLECTUAL",
    categorySeven: "CREATIVE",
    location: "ZURICH",
  };
  mockAxios.post.mockResolvedValueOnce(test);

  const result = await TestResultsService(test);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`/test`, test);
  expect(result).toEqual({
    username: "user",
    categoryOne: "ACTIVE",
    categoryTwo: "CREATIVE",
    categoryThree: "SOCIAL",
    categoryFour: "ACTIVE",
    categoryFive: "OTHER",
    categorySix: "INTELLECTUAL",
    categorySeven: "CREATIVE",
    location: "ZURICH",
  });
});

it("renders without crashing", () => {
  render(
    <Router>
      {" "}
      <TestForm />
    </Router>
  );
});

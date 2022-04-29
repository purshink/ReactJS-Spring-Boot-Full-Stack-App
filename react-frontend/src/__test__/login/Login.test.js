import { render, cleanup, screen } from "@testing-library/react";
import Login from "../../components/root/users/login/Login";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import LoginService from "../../api/login/LoginService";
import AuthenticateUserDataService from "../../api/authentication/AuthenticateUserDataService";
import mockAxios from "jest-mock-axios";

beforeEach(() =>
  render(
    <Router>
      {" "}
      <Login />
    </Router>
  )
);

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("input should be initially empty", () => {
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");

  expect(username.value).toBe("");
  expect(password.value).toBe("");
});

it("change value of input element works correctly", () => {
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");

  userEvent.type(username, "patofil");
  expect(username.value).toBe("patofil");

  userEvent.type(password, "n66123");
  expect(password.value).toBe("n66123");
});

it("should show error message on invalid input", () => {
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");

  userEvent.type(username, "pat");
  userEvent.type(password, "");

  const submitBtnElement = screen.getByRole("button", { name: /Login/i });

  userEvent.click(submitBtnElement);
  const errorUsername = screen.getByText(/Minimum 4 characters/i);
  const errorPassword = screen.getByText(/Password required/i);

  expect(errorUsername).toBeInTheDocument();
  expect(errorPassword).toBeInTheDocument();
});

it("should authenticate user creadentials successfully", async () => {
  const username = "user";
  const password = "123";

  mockAxios.post.mockResolvedValueOnce(username);

  const result = await AuthenticateUserDataService(username, password);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(
    `http://localhost:8080/authenticate`,
    {
      password: "123",
      username: "user",
    }
  );

  expect(result).toEqual("user");
});

it("should assign correct user role successfully", async () => {
  const username = "user";
  mockAxios.post.mockResolvedValueOnce("USER");

  const result = await LoginService(username);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith("/login", null, {
    params: { username: "user" },
  });
  expect(result).toEqual("USER");
});

import { render, cleanup, screen } from "@testing-library/react";
import PasswordChange from "../../components/root/users/login/forgottenPassword/PasswordChange";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import UserEmailDataService from "../../api/users/UserEmailDataService";
import mockAxios from "jest-mock-axios";

beforeEach(() =>
  render(
    <Router>
      {" "}
      <PasswordChange />
    </Router>
  )
);

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("input should be initially empty", () => {
  const email = screen.getByLabelText("Your email:");

  expect(email.value).toBe("");
});

it("change value of input element works correctly", () => {
  const email = screen.getByLabelText("Your email:");

  userEvent.type(email, "n66@mail.com");
  expect(email.value).toBe("n66@mail.com");
});

it("should show error message on invalid input", () => {
  const email = screen.getByLabelText("Your email:");

  userEvent.type(email, "n66gmail.com");

  const submitBtnElement = screen.getByRole("button", { name: /Submit/i });

  userEvent.click(submitBtnElement);

  const errorEmail = screen.getByText(/Invalid email address/i);

  expect(errorEmail).toBeInTheDocument();
});

it("should send email correctly", async () => {
  const email = "n87@gmail.com";

  mockAxios.post.mockResolvedValueOnce(email);

  const result = await UserEmailDataService(email);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(
    `http://localhost:8080/notification`,
    email
  );
  expect(result).toEqual("n87@gmail.com");
});

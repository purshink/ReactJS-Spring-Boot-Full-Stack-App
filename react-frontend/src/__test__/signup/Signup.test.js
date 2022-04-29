import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import SignUp from "../../components/root/users/signUp/SignUp";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignUpAppClientService from "../../api/signup/SignUpAppClientService";
import mockAxios from "jest-mock-axios";

beforeEach(() =>
  render(
    <Router>
      {" "}
      <SignUp />
    </Router>
  )
);
afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("input should be initially empty", () => {
  const username = screen.getByLabelText("Username");
  const fullname = screen.getByLabelText("Full Name");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Confirm Password");

  expect(username.value).toBe("");
  expect(fullname.value).toBe("");
  expect(email.value).toBe("");
  expect(password.value).toBe("");
  expect(repassword.value).toBe("");
});

it("should have checkbox with one checked box by default", () => {
  const checkbox1 = screen.getByLabelText("Male");
  const checkbox2 = screen.getByLabelText("Female");
  const checkbox3 = screen.getByLabelText("Other");
  expect(checkbox1).not.toBeChecked();
  expect(checkbox2).not.toBeChecked();
  expect(checkbox3).toBeChecked();
});

it("change value of input element works correctly", () => {
  const username = screen.getByLabelText("Username");
  const fullname = screen.getByLabelText("Full Name");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Confirm Password");

  userEvent.type(username, "patofil");
  expect(username.value).toBe("patofil");

  userEvent.type(fullname, "Chris Brown");
  expect(fullname.value).toBe("Chris Brown");

  userEvent.type(email, "n66@gmail.com");
  expect(email.value).toBe("n66@gmail.com");

  userEvent.type(password, "n66123");
  expect(password.value).toBe("n66123");

  userEvent.type(repassword, "n66123");
  expect(repassword.value).toBe("n66123");
});

it("click on gender box should change the tick", () => {
  const checkbox1 = screen.getByLabelText("Male");
  const checkbox2 = screen.getByLabelText("Female");
  const checkbox3 = screen.getByLabelText("Other");

  userEvent.click(checkbox2);

  expect(checkbox1).not.toBeChecked();
  expect(checkbox2).toBeChecked();
  expect(checkbox3).not.toBeChecked();
});

it("should show error message on invalid input", () => {
  const username = screen.getByLabelText("Username");
  const fullname = screen.getByLabelText("Full Name");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Confirm Password");

  userEvent.type(username, "pat");
  userEvent.type(fullname, "C");
  userEvent.type(email, "n66gmail.com");
  userEvent.type(password, "");
  userEvent.type(repassword, "n66");

  const submitBtnElement = screen.getByRole("button", { name: /Sign up/i });

  userEvent.click(submitBtnElement);
  const errorUsername = screen.getByText(/Minimum 5 char/i);
  const errorFullName = screen.getByText(/2 to 20 char/i);
  const errorEmail = screen.getByText(/Invalid email address/i);
  const errorPassword = screen.getByText(/Required/i);
  const errorRepassword = screen.getByText(/Passwords don't match/i);

  expect(errorUsername).toBeInTheDocument();
  expect(errorFullName).toBeInTheDocument();
  expect(errorEmail).toBeInTheDocument();
  expect(errorPassword).toBeInTheDocument();
  expect(errorRepassword).toBeInTheDocument();
});

it("should sign up user successfully", async () => {
  const info = {
    username: "user",
    fullName: "Chris Brown",
    gender: "MALE",
    email: "chris@gmail.com",
    password: "123",
    repeatpassword: "123",
  };
  mockAxios.post.mockResolvedValueOnce(info);

  const result = await SignUpAppClientService(info);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`/signup`, info);
  expect(result).toEqual({
    username: "user",
    fullName: "Chris Brown",
    gender: "MALE",
    email: "chris@gmail.com",
    password: "123",
    repeatpassword: "123",
  });
});

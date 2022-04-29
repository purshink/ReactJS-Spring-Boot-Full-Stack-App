import { render, cleanup, screen } from "@testing-library/react";
import RegisterBusiness from "../../components/root/users/signUp/RegisterBusiness";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import RegisterBusinessService from "../../api/signup/RegisterBusinessService";
import mockAxios from "jest-mock-axios";

beforeEach(() =>
  render(
    <Router>
      {" "}
      <RegisterBusiness />
    </Router>
  )
);
afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("input should be initially empty", () => {
  const username = screen.getByLabelText("Username");
  const businessName = screen.getByLabelText("Business Name");
  const address = screen.getByLabelText("Address");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Repeat Password");

  expect(username.value).toBe("");
  expect(businessName.value).toBe("");
  expect(address.value).toBe("");
  expect(email.value).toBe("");
  expect(password.value).toBe("");
  expect(repassword.value).toBe("");
});

it("change value of input element works correctly", () => {
  const username = screen.getByLabelText("Username");
  const businessName = screen.getByLabelText("Business Name");
  const address = screen.getByLabelText("Address");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Repeat Password");

  userEvent.type(username, "patofil");
  expect(username.value).toBe("patofil");

  userEvent.type(businessName, "Business");
  expect(businessName.value).toBe("Business");

  userEvent.type(address, "Street 1");
  expect(address.value).toBe("Street 1");

  userEvent.type(email, "n66@gmail.com");
  expect(email.value).toBe("n66@gmail.com");

  userEvent.type(password, "n66123");
  expect(password.value).toBe("n66123");

  userEvent.type(repassword, "n66123");
  expect(repassword.value).toBe("n66123");
});

it("should show error message on invalid input", () => {
  const username = screen.getByLabelText("Username");
  const businessName = screen.getByLabelText("Business Name");
  const address = screen.getByLabelText("Address");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Repeat Password");

  userEvent.type(username, "pat");
  userEvent.type(businessName, "C");
  userEvent.type(address, "");
  userEvent.type(email, "n66gmail.com");
  userEvent.type(password, "");
  userEvent.type(repassword, "n66");

  const submitBtnElement = screen.getByRole("button", { name: /Sign up/i });

  userEvent.click(submitBtnElement);
  const errorUsername = screen.getByText(/Minimum 5 char/i);
  const errorBusinessName = screen.getByText(/2 to 20 char/i);
  const errorAddress = screen.getByText(/Invalid Address/i);
  const errorEmail = screen.getByText(/Invalid Email/i);
  const errorPassword = screen.getByText(/Invalid Password/i);
  const errorRepassword = screen.getByText(/Passwords don't match/i);

  expect(errorUsername).toBeInTheDocument();
  expect(errorBusinessName).toBeInTheDocument();
  expect(errorAddress).toBeInTheDocument();
  expect(errorEmail).toBeInTheDocument();
  expect(errorPassword).toBeInTheDocument();
  expect(errorRepassword).toBeInTheDocument();
});

it("should register business successfully", async () => {
  const info = {
    username: "business",
    businessName: "Business",
    address: "Street City",
    email: "chris@gmail.com",
    password: "123",
    repeatpassword: "123",
  };
  mockAxios.post.mockResolvedValueOnce(info);

  const result = await RegisterBusinessService(info);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`/register`, info);
  expect(result).toEqual({
    username: "business",
    businessName: "Business",
    address: "Street City",
    email: "chris@gmail.com",
    password: "123",
    repeatpassword: "123",
  });
});

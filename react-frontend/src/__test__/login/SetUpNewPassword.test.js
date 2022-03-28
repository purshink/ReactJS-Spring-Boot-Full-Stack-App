import { render, cleanup, screen } from "@testing-library/react";
import SetUpNewPassword from "../../components/root/users/login/forgottenPassword/SetUpNewPassword";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdatePasswordService from "../../api/login/forgottenPassword/UpdatePasswordService";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";

beforeEach(() =>
  render(
    <Router>
      {" "}
      <SetUpNewPassword />
    </Router>
  )
);

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("input should be initially empty", () => {
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Confirm Password");

  expect(repassword.value).toBe("");
  expect(password.value).toBe("");
});

it("change value of input element works correctly", () => {
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Confirm Password");

  userEvent.type(password, "n66123");
  expect(password.value).toBe("n66123");
  userEvent.type(repassword, "n66123");
  expect(repassword.value).toBe("n66123");
});

it("should show error message on invalid input", () => {
  const password = screen.getByLabelText("Password");
  const repassword = screen.getByLabelText("Confirm Password");

  userEvent.type(password, "");
  userEvent.type(repassword, "n66");

  const submitBtnElement = screen.getByRole("button", { name: /Submit/i });

  userEvent.click(submitBtnElement);

  const errorPassword = screen.getByText(/Invalid Password/i);
  const errorRepassword = screen.getByText(/Passwords don't match/i);

  expect(errorPassword).toBeInTheDocument();
  expect(errorRepassword).toBeInTheDocument();
});

it("should update password correctly", async () => {
  const id = "1";
  const password = "n87";
  mockAxios.post.mockResolvedValueOnce(id);

  const result = await UpdatePasswordService(id, password);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(
    `http://localhost:8080/password`,
    null,
    { params: { id: "1", password: "n87" } }
  );
  expect(result).toEqual("1");
});

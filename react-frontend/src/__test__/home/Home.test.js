import { render, cleanup, screen } from "@testing-library/react";
import Home from "../../components/root/home/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

afterEach(cleanup);

it("renders without crashing", () => {
  render(
    <Router>
      {" "}
      <Home />
    </Router>
  );
  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});

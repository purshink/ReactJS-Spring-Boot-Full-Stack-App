import { render, screen } from "@testing-library/react";
import App from "./App";
import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

it("renders without crashing", () => {
  render(<App />);

  expect(screen.getByText(/Ready to have fun?/i)).toBeInTheDocument();
});

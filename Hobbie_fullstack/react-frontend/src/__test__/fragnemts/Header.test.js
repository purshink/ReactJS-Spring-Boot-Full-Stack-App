import { render, screen } from "@testing-library/react";
import Header from "../../components/root/fragments/header/Header";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

it("renders without crashing", () => {
  render(
    <Router>
      {" "}
      <Header />
    </Router>
  );
  expect(screen.getByText(/Register Bizz/i)).toBeInTheDocument();
});

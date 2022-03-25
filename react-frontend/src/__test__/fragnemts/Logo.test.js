import { render, screen } from "@testing-library/react";
import Logo from "../../components/root/fragments/header/logo/Logo";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

it("renders without crashing", () => {
  render(
    <Router>
      {" "}
      <Logo />
    </Router>
  );
});

import { render, screen } from "@testing-library/react";
import Footer from "../../components/root/fragments/footer/Footer";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

it("footer renders without crashing", () => {
  render(
    <Router>
      {" "}
      <Footer />
    </Router>
  );
  expect(
    screen.getByText(/Hobbie 2022. All rights reserved./i)
  ).toBeInTheDocument();
});


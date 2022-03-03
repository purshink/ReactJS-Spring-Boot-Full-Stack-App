import { render, cleanup } from "@testing-library/react";
import Background from "../../components/root/fragments/background/Background";
import BackgroundHome from "../../components/root/fragments/background/BackgroundHome";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

it("background renders without crashing", () => {
  render(
    <Router>
      {" "}
      <Background />
    </Router>
  );
});

it("backgroundHome renders without crashing", () => {
  render(
    <Router>
      {" "}
      <BackgroundHome />
    </Router>
  );
});

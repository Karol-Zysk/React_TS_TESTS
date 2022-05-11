import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders LoginDiv with <Login /> inside", () => {
  render(<App />);
  const divElement = screen.getByTestId("LoginDiv");
  expect(divElement).toBeInTheDocument();
});

test("renders All Figures", () => {
  render(<App />);
  const figures = screen.getAllByRole("figure");
  expect(figures).toHaveLength(3);
});

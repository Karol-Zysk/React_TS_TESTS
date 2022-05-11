import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("renders empty username input", () => {
  render(<Login />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl.value).toBe("");
});

test("renders empty password input", () => {
  render(<Login />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  expect(usernameInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonEl: HTMLButtonElement = screen.getByText(/login/i);
  expect(buttonEl.disabled).toBe(true);
});

test("loading shuld not be rendered", () => {
  render(<Login />);
  const buttonEl: HTMLButtonElement = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("Error message should not be visible", () => {
  render(<Login />);
  const errorMessage: HTMLSpanElement = screen.getByTestId(/error/i);
  expect(errorMessage.style.visibility).toBe("hidden");
});

test("username input should change", () => {
  render(<Login />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("button should not be disabled if inputs filled", () => {
  render(<Login />);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testPasswordValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testPasswordValue } });

  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const testUsernameValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testUsernameValue } });

  const buttonEl: HTMLButtonElement = screen.getByText(/login/i);
  expect(buttonEl.disabled).toBe(false);
});

test("loading should be rendered after ckick", () => {
  render(<Login />);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const buttonEl: HTMLButtonElement = screen.getByText(/login/i);

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.change(usernameInputEl, { target: { value: testValue } });

  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const buttonEl: HTMLButtonElement = screen.getByText(/login/i);

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.change(usernameInputEl, { target: { value: testValue } });

  fireEvent.click(buttonEl);

  await expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});

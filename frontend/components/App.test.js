import AppFunctional from "./AppFunctional";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Write your tests here
test('The links to functional and class-based are on the page', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText('type email');

  fireEvent.change(email, { target: { value: 'funky@fresh.beats' } });

  expect(emailInput.value).toEqual('funky@fresh.beats');
})

test('Coordinates change when right is pressed', () => {
  render(<AppFunctional />);
  const rightButt = document.querySelector('#right');
  const coords = screen.getByText(/Coordinates/i);

  fireEvent.click(rightButt);

  expect(coords.innerHTML).toEqual("Coordinates (3, 2)")
})

test('Coordinates change when left is pressed', () => {
  render(<AppFunctional />);
  const rightButt = document.querySelector('#left');
  const coords = screen.getByText(/Coordinates/i);

  fireEvent.click(rightButt);

  expect(coords.innerHTML).toEqual("Coordinates (1, 2)")
})

test('Coordinates change when down is pressed', () => {
  render(<AppFunctional />);
  const rightButt = document.querySelector('#down');
  const coords = screen.getByText(/Coordinates/i);

  fireEvent.click(rightButt);

  expect(coords.innerHTML).toEqual("Coordinates (2, 3)")
})

test('Coordinates change when up is pressed', () => {
  render(<AppFunctional />);
  const rightButt = document.querySelector('#up');
  const coords = screen.getByText(/Coordinates/i);

  fireEvent.click(rightButt);

  expect(coords.innerHTML).toEqual("Coordinates (2, 1)")
})

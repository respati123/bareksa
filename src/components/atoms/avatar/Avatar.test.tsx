import React from 'react';
import { render, screen } from '@testing-library/react';
import { WrapperRenderTest } from 'config/WrapperRenderTest';
import Avatar from 'components/atoms/avatar/Avatar';

const NAME = 'Respati Tri';
test('render initial name', () => {
  render(WrapperRenderTest(<Avatar name={NAME} />));
  const spanElement = screen.getAllByTestId('initial-name');
  expect(spanElement[0]).toBeInTheDocument();
  expect(spanElement[0]).toHaveTextContent('RT');
});

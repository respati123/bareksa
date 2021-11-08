import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { WrapperRenderTest } from 'config/WrapperRenderTest';
import { InputCustom } from 'components/atoms';
import { generateTestId } from 'utils/generateTestId';
import { NameTestId } from 'constants/stringTestId';

const INPUT_VALUE = 'bareksa';

test('renders value text input search', () => {
  const utils = render(WrapperRenderTest(<InputCustom />));
  const valueElement = utils.getAllByTestId(
    generateTestId(NameTestId.inputSearchHeader)
  ) as HTMLInputElement[];
  fireEvent.change(valueElement[0], { target: { value: INPUT_VALUE } });
  expect(valueElement[0].value).toBe(INPUT_VALUE);
});

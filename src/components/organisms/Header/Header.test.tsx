import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { WrapperRenderTest } from 'config/WrapperRenderTest';

import { generateTestId } from 'utils/generateTestId';
import { NameTestId } from 'constants/stringTestId';
import { Header } from 'components/organisms';

const setup = ({ onClick }: { onClick: () => void }) => (
  <div onClick={onClick}>
    <Header />
  </div>
);

test('handle click expand header menu', () => {
  const onClick = jest.fn();
  const ElementExpand = render(WrapperRenderTest(setup({ onClick })));

  fireEvent.click(
    ElementExpand.getByTestId(generateTestId(NameTestId.buttonExpand))
  );
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('handle click change state ', () => {
  const onClick = jest.fn();
  const ElementExpand = render(WrapperRenderTest(setup({ onClick })));

  fireEvent.click(
    ElementExpand.getByTestId(generateTestId(NameTestId.buttonExpand))
  );

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(
    ElementExpand.getByTestId(generateTestId(NameTestId.componentExpand))
  ).toHaveStyle('height: 100%');
});

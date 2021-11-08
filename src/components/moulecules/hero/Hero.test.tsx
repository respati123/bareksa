import { render } from '@testing-library/react';
import { WrapperRenderTest } from 'config/WrapperRenderTest';
import { Hero } from 'components/moulecules';
import React from 'react';
import { generateTestId } from 'utils/generateTestId';
import { NameTestId } from 'constants/stringTestId';

const Profile = {
  name: 'Respati Tri',
  address: 'bekasi',
};

test('render name hero', () => {
  const Wrapper = render(
    WrapperRenderTest(<Hero name={Profile.name} address={Profile.address} />)
  );
  const getNameElement = Wrapper.getByTestId(
    generateTestId(NameTestId.heroName)
  );
  expect(getNameElement).toHaveTextContent(Profile.name);
});

test('render Address hero', () => {
  const Wrapper = render(
    WrapperRenderTest(<Hero name={Profile.name} address={Profile.address} />)
  );
  const getAddressElement = Wrapper.getByTestId(
    generateTestId(NameTestId.heroAddress)
  );
  expect(getAddressElement).toHaveTextContent(Profile.address);
});

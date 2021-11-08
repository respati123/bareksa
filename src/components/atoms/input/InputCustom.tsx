import React from 'react';
import { InputContainer, InputCustomStyled } from './Input.styled';
import { generateTestId } from 'utils/generateTestId';
import { NameTestId } from 'constants/stringTestId';

export interface InputCustomProps {
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

const InputCustom = (props: InputCustomProps) => {
  const { iconRight, iconLeft } = props;
  return (
    <InputContainer iconRight={iconRight} iconLeft={iconLeft}>
      <InputCustomStyled
        data-testid={generateTestId(NameTestId.inputSearchHeader)}
        placeholder="Search Text"
      />
      {(iconRight || iconLeft) && <span>{iconRight ?? iconLeft}</span>}
    </InputContainer>
  );
};

export default React.memo(InputCustom);

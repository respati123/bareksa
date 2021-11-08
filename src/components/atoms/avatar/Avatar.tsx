import React from 'react';
import { AvatarDiv, AvatarStyled } from './Avatar.styled';

export interface AvatarProps
  extends Partial<React.ImgHTMLAttributes<HTMLImageElement>> {
  name?: string;
  address?: string;
}

const Avatar = (props: AvatarProps) => {
  const { name } = props;

  const getInitialNameFromName = (): string => {
    const getFirstChar = (char: string) => char.charAt(0).toUpperCase();

    if (name) {
      const arraySplitName = name?.split(' ');
      const getFirstCharName = getFirstChar(arraySplitName[0]);
      const getSecondCharName = getFirstChar(
        arraySplitName[arraySplitName.length - 1]
      );

      return `${getFirstCharName}${getSecondCharName}`;
    }
    return '';
  };

  return name ? (
    <AvatarDiv>
      <span data-testid="initial-name">{getInitialNameFromName()}</span>
    </AvatarDiv>
  ) : (
    <AvatarStyled {...props} />
  );
};

export default React.memo(Avatar);

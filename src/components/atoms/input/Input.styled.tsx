import styled from 'styled-components';
import { Box } from 'components/atoms';
import { convertHexToRgba } from 'utils/convertHexToRgba';
import { InputCustomProps } from './InputCustom';

export const InputCustomStyled = styled.input`
  width: 100%;
  ${({ theme }) => theme.fonts.atom400};
  border-radius: 0.2rem;
  border: none;
  outline: none;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  border: 1px solid ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.1)};
  &:focus {
    border-width: 0.15rem;
  }
`;

export const InputContainer = styled(Box)<InputCustomProps>`
  width: 16rem;
  border-radius: 0.2rem;
  position: relative;
  span {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);

    img {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
`;

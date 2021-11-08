import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';

export const AvatarStyled = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const AvatarDiv = styled.div`
  width: 30px;
  height: 30px;
  padding: 0.19rem;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.1)};

  span {
    ${({ theme }) => theme.fonts.kappa700}
  }
`;

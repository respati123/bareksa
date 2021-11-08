import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';

export const FilterStyled = styled.div`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.1)};
  position: relative;
  border-radius: 4px;

  &:after {
    content: '...';
    display: flex;
    width: 100%;
    justify-content: center;
    margin: auto;
    transform: translateY(25%);
    text-align: center;
    position: absolute;
  }
`;

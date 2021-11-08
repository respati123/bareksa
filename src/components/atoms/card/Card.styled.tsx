import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';

export const CardStyled = styled.div`
  padding: 2rem;
  margin: 0.5rem;
  border: 1px solid ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.1)};
  border-radius: 4px;
`;

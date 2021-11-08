import styled from 'styled-components';

export const Text = styled.p``;

export const TextTitle = styled.h1`
  ${({ theme }) => theme.fonts.alpha700};
  text-transform: capitalize;
`;

import styled from 'styled-components';
import { Box, ImagesComponent, Text } from 'components/atoms';
import { convertHexToRgba } from 'utils/convertHexToRgba';
import { device } from 'styles/breakpoints';

export const HeroContainer = styled(Box)`
  width: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media ${device.tablet} {
    display: none;
  }
`;

export const ContainerName = styled(Box)`
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 2rem;
`;

export const TextName = styled(Text)`
  ${({ theme }) => theme.fonts.kappa700};
`;

export const TextAddress = styled(Text)`
  ${({ theme }) => theme.fonts.atom400};
  color: ${({ theme }) => theme.colors.gray};
`;

export const Arrow = styled(ImagesComponent)`
  color: ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.1)};
`;

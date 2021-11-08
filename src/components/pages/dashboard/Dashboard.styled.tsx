import styled from 'styled-components';
import { Box } from 'components/atoms';
import { CardStyled } from 'components/atoms/card/Card.styled';
import { device } from 'styles/breakpoints';

export const DashboardBox = styled(Box)`
  flex-direction: column;
`;

export const DashboardContent = styled(Box)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 0.5rem;
  height: 100%;
`;

export const ChartContent = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  flex: 1;

  @media ${device.tablet} {
    flex-direction: column;
  }

  @media ${device.laptopL} {
    justify-content: space-around;
  }
`;

export const ChartConversion = styled(CardStyled)`
  width: 100%;
  max-width: 350px;
  //min-width: 200px;
  position: relative;
  flex: 1;
  height: 505px;
  max-height: 505px;
`;

export const ChartUsers = styled(CardStyled)`
  width: 100%;
  position: relative;
  //min-width: 200px;
  max-width: 350px;
  height: 505px;
  max-height: 505px;
  flex: 1;
`;

export const ChartRevenue = styled(CardStyled)`
  width: auto;
  position: relative;
  min-width: 500px;
  max-height: 505px;
  height: 505px;
  flex: 1;
  justify-items: flex-start;
`;

export const TextDate = styled.h1`
  ${({ theme }) => theme.fonts.atom600};

  text-align: end;
  margin: 1.3rem;
`;

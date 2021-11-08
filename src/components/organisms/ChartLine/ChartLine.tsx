import { Line } from 'react-chartjs-2';
import React from 'react';
import { SkeletonComponent } from 'components/organisms';
import { Box, ImagesComponent } from 'components/atoms';
import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';
import { ImagesArrowUp } from 'assets/png';

const data = (canvas: any) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, 'rgba(120, 151, 100, 0.65)');
  // gradient.addColorStop(, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  return {
    labels: [
      '02:00',
      '04:00',
      '06:00',
      '08:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '00:00',
    ],
    datasets: [
      {
        fill: 'start',
        backgroundColor: gradient,
        strokeColor: '#ff6c23',
        pointColor: '#fff',
        pointStrokeColor: '#789764A6',
        pointHighlightFill: '#fff',
        pointHighlightStroke: '#ff6c23',
        data: [
          25.0, 32.4, 22.2, 39.4, 34.2, 22.0, 23.2, 24.1, 20.0, 18.4, 19.1,
          17.4,
        ],
      },
    ],
  };
};

const ChartLine = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '150px',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <SkeletonComponent isLoading={false} type="box-filter">
        <div style={{ overflowX: 'scroll' }}>
          <Line
            style={{ width: '100%' }}
            options={{ plugins: { legend: { display: false } } }}
            height={100}
            data={data}
          />
        </div>
      </SkeletonComponent>
      <Box style={{ marginTop: '2rem', flexDirection: 'column' }}>
        <TextRevenue>total revenue</TextRevenue>
        <TextTotalRevenue>$76685.41</TextTotalRevenue>
        <Box style={{ marginTop: '1rem', alignItems: 'center' }}>
          <ImagesComponent
            style={{ width: '10px', height: '10px', marginRight: '.5rem' }}
            src={ImagesArrowUp}
          />
          <TextPercent>7,00%</TextPercent>
        </Box>
      </Box>
    </div>
  );
};

const TextRevenue = styled.h1`
  ${({ theme }) => theme.fonts.atom600};
  color: ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.5)};
  text-transform: capitalize;
`;

const TextTotalRevenue = styled.h1`
  ${({ theme }) => theme.fonts.alpha700};
  text-transform: capitalize;
`;

const TextPercent = styled.h1`
  ${({ theme }) => theme.fonts.atom500};
  color: ${({ theme }) => theme.colors.completed};
  text-transform: capitalize;
`;

export default React.memo(ChartLine);

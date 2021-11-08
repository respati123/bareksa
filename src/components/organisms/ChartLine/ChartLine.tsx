import { Line } from 'react-chartjs-2';
import React from 'react';
import { SkeletonComponent } from 'components/organisms';
import { Box, ImagesComponent } from 'components/atoms';
import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';
import { ImagesArrowUp, ImagesCalendar } from 'assets/png';
import moment from 'moment';
import UniqueData from 'utils/UniqueData';

interface ChartLineProps {
  data: [] | undefined;
  isLoading: boolean;
  date: { startDate: moment.Moment; endDate: moment.Moment };
}

type TempDataType = {
  [k: string]: [];
};

const ChartLine = (props: ChartLineProps) => {
  const { isLoading, data: DataChart } = props;

  const detailMonth = DataChart?.data?.orders
    ?.sort((a, b) => moment(a.start_date).unix() - moment(b.start_date).unix())
    .map((d) => moment(d.start_date).format('MMM'))
    .filter(UniqueData);
  const setupDateFromDay = () => {
    const orders = DataChart?.data?.orders;

    let tempData: TempDataType = {};
    for (const order in orders) {
      const itemOrder = orders[order];
      const key = moment(itemOrder.start_date).format('ddd');
      const value = itemOrder.conversion_revenue;

      if (tempData[key]) {
        tempData = {
          ...tempData,
          [key]:
            parseInt(String(tempData[key]), 10) + parseInt(String(value), 10),
        };
      } else {
        tempData[key] = value;
      }
    }
    return {
      Mon: tempData.Mon ?? 0,
      Tue: tempData.Tue ?? 0,
      Wed: tempData.Wed ?? 0,
      Thu: tempData.Thu ?? 0,
      Fri: tempData.Fri ?? 0,
      Sat: tempData.Sat ?? 0,
      Sun: tempData.Sun ?? 0,
    };
  };

  const revenues = Object.values(setupDateFromDay()).reduce(
    (a, b) => a + b,
    10
  );

  const data = (canvas: any) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, 'rgba(120, 151, 100, 0.65)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    return {
      labels: Object.keys(setupDateFromDay()),
      datasets: [
        {
          fill: 'start',
          backgroundColor: gradient,
          strokeColor: '#ff6c23',
          pointColor: '#fff',
          pointStrokeColor: '#789764A6',
          pointHighlightFill: '#fff',
          pointHighlightStroke: '#ff6c23',
          data: Object.values(setupDateFromDay()),
        },
      ],
    };
  };
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
      <FilterRevenue>
        {detailMonth && (
          <h1>{`${detailMonth[0] ?? ''} - ${
            detailMonth[detailMonth.length - 1] ?? ''
          } 2021`}</h1>
        )}
        <ImagesComponent
          style={{ width: '16px', height: '16px' }}
          src={ImagesCalendar}
        />
      </FilterRevenue>
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
        <TextTotalRevenue>{`$${revenues}`}</TextTotalRevenue>
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

const FilterRevenue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  width: 160px;
  position: absolute;
  top: 5%;
  right: 5%;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.2)};
  ${({ theme }) => theme.fonts.atom600};
  line-height: 25px;
`;

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

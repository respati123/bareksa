import { PolarArea } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { SkeletonComponent } from 'components/organisms';
import { ChartData } from 'chart.js';
import { Box } from 'components/atoms';
import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';

interface ChartPolarProps {
  isLoading: boolean;
  data: any;
}

const ChartPolar = (props: ChartPolarProps) => {
  const { isLoading, data: dataFetch } = props;
  const [stateDataChart, setStateDataChart] = useState<ChartData | undefined>(
    undefined
  );

  useEffect(() => {
    if (dataFetch) {
      setupData();
    }
  }, [dataFetch]);

  const setupData = () => {
    const getBackgroundColor = (key: string) => {
      switch (key) {
        case 'risk_averse':
          return '#5C8F94';
        case 'conservative':
          return '#E4EAEB';
        case 'moderate':
          return '#725E9C';
        case 'risk_taker':
          return '#EBA45E';
        default:
      }
    };

    const userCategories = dataFetch?.data?.user_category;
    const result = {
      data: Object.values(userCategories),
      backgroundColor: Object.keys(userCategories).map((bg) =>
        getBackgroundColor(bg)
      ),
      borderWidth: Object.keys(userCategories).map((bg) =>
        getBackgroundColor(bg)
      ),
    };

    setStateDataChart((prevState) => {
      return {
        ...prevState,
        labels: Object.values(userCategories),
        datasets: [result],
      };
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '150px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <SkeletonComponent isLoading={isLoading} type="circle-chart">
        {stateDataChart && (
          <PolarArea
            data={stateDataChart}
            options={{
              plugins: {
                legend: {
                  display: false,
                  position: 'bottom',
                  labels: {
                    boxWidth: 12,
                  },
                },
                tooltip: {
                  backgroundColor: '#FFFFFF',
                  titleColor: 'black',
                  callbacks: {
                    title(tooltipItems) {
                      return tooltipItems[0].label;
                    },
                    labelColor(tooltipItem) {
                      return {};
                    },
                    label(tooltipItem) {
                      return '';
                    },
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        )}
      </SkeletonComponent>

      <SkeletonComponent isLoading={isLoading} type="title">
        {stateDataChart && (
          <Box style={{ marginTop: '3.5rem' }}>
            {stateDataChart?.datasets[0].backgroundColor?.map(
              (color: string, index: number) => {
                if (stateDataChart?.labels) {
                  const label = stateDataChart?.labels[index] as string;
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <LabelChart color={color} label={label} />
                      <TextLabel>{label}</TextLabel>
                    </div>
                  );
                }
              }
            )}
          </Box>
        )}
      </SkeletonComponent>
    </div>
  );
};

interface LabelChartProps {
  color: string;
  label: string;
}

const LabelChart = styled.div<LabelChartProps>`
  background-color: ${(props) => props.color};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 1rem;
  position: relative;
`;

const TextLabel = styled.h1`
  ${({ theme }) => theme.fonts.atom400};
  color: ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.5)};
`;

export default React.memo(ChartPolar);

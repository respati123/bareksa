import React, { useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import { SkeletonComponent } from 'components/organisms';
import { Pie } from 'react-chartjs-2';
import { Box } from 'components/atoms';
import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';

interface ChartPieProps {
  isLoading: boolean;
  data: any;
}

type DataVariantType = {
  [k: string]: { backgroundColor: string; total: number[] };
};
const ChartPie = (props: ChartPieProps) => {
  const { isLoading, data: dataFetch } = props;
  const [stateDataChart, setStateDataChart] = useState<ChartData | undefined>(
    undefined
  );

  useEffect(() => {
    if (dataFetch) {
      setupData();
    }
  }, [dataFetch]);

  const getBackgroundColor =
    (variant: DataVariantType) => (item: string, _: number) => {
      return variant[item].backgroundColor;
    };

  const getData = (variant: DataVariantType) => (item: string, _: number) => {
    return variant[item].total?.reduce(
      (a, b) => parseInt(String(a), 10) + parseInt(String(b), 10),
      0
    );
  };

  const setDataSetChart = (variantConversion: DataVariantType) => {
    const dataSet = Object.keys(variantConversion).map(
      getData(variantConversion)
    );
    const backgroundColors = Object.keys(variantConversion).map(
      getBackgroundColor(variantConversion)
    );
    const borderColor = Object.keys(variantConversion).map(
      getBackgroundColor(variantConversion)
    );

    const result = {
      labels: dataSet,
      data: dataSet,
      backgroundColor: backgroundColors,
      borderColor,
      borderWidth: 1,
    };

    setStateDataChart((prevState) => {
      return {
        ...prevState,
        labels: result.labels,
        datasets: [result],
      };
    });
  };

  const getBackgroundColors = (key: string) => {
    switch (key) {
      case 'Mutualfund':
        return '#5C8F94';
      case 'Bonds':
        return '#E4EAEB';
      case 'Unit Link':
        return '#725E9C';
      case 'Gold':
        return '#EBA45E';
      default:
    }
  };

  const setupData = () => {
    let tempConversions: DataVariantType = {};
    const conversions = dataFetch?.data?.orders;
    for (const conversion of conversions) {
      const key = conversion.conversion_item;
      const value = conversion.conversion_revenue;
      const generatedObject = {
        backgroundColor: getBackgroundColors(key),
        total: !tempConversions[key]?.total
          ? [...[], value]
          : tempConversions[key].total.concat(value),
      };
      tempConversions = {
        ...tempConversions,
        [key]: generatedObject,
      };
    }

    setDataSetChart(tempConversions);
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
          <Pie
            data={stateDataChart}
            options={{
              plugins: {
                tooltip: {
                  backgroundColor: '#FFFFFF',
                  titleColor: 'black',
                  callbacks: {
                    title(tooltipItems) {
                      return `$${tooltipItems[0].label}`;
                    },
                    labelColor(tooltipItem) {
                      return {};
                    },
                    label(tooltipItem) {
                      return '';
                    },
                  },
                },
                legend: {
                  display: false,
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
                      <TextLabel>{`$${label}`}</TextLabel>
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

export default React.memo(ChartPie);

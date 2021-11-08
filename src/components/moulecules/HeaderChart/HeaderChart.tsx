import { SkeletonComponent } from 'components/organisms';
import React from 'react';
import { Box, FilterStyled, TextTitle } from 'components/atoms';

interface HeaderChartProps {
  isLoading: boolean;
  title: string;
}

const HeaderChart = (props: HeaderChartProps) => {
  const { isLoading, title } = props;
  return (
    <Box style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <SkeletonComponent isLoading={isLoading} type="title">
        <TextTitle>{title}</TextTitle>
      </SkeletonComponent>
      <SkeletonComponent isLoading={isLoading} type="box-filter">
        <FilterStyled />
      </SkeletonComponent>
    </Box>
  );
};

export default React.memo(HeaderChart);

import { SkeletonComponent } from 'components/organisms';
import React from 'react';
import { Box, FilterStyled, TextTitle } from 'components/atoms';

interface HeaderChartProps {
  isLoading: boolean;
  title: string;
  noFilter?: boolean;
}

const HeaderChart = (props: HeaderChartProps) => {
  const { isLoading, title, noFilter } = props;
  return (
    <Box style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <SkeletonComponent isLoading={isLoading} type="title">
        <TextTitle>{title}</TextTitle>
      </SkeletonComponent>
      {!noFilter && (
        <SkeletonComponent isLoading={isLoading} type="box-filter">
          <FilterStyled />
        </SkeletonComponent>
      )}
    </Box>
  );
};

export default React.memo(HeaderChart);

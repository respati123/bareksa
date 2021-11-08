import {
  SkeletonStyled,
  SkeletonStyledType,
} from 'components/organisms/Skeleton/Skeleton.styled';
import React from 'react';

interface SkeletonComponentProps extends SkeletonStyledType {
  isLoading?: boolean;
  children?: React.ReactNode;
}

const SkeletonComponent = (props: SkeletonComponentProps) => {
  const { type, isLoading, children } = props;
  return <>{isLoading ? <SkeletonStyled type={type} /> : children}</>;
};

export default React.memo(SkeletonComponent);

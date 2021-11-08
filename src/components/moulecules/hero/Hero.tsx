import React from 'react';
import {
  Arrow,
  ContainerName,
  HeroContainer,
  TextAddress,
  TextName,
} from './Hero.styled';
import { Avatar } from 'components/atoms';
import { AvatarProps } from 'components/atoms/avatar/Avatar';
import { ImagesArrow } from 'assets/png';
import { generateTestId } from 'utils/generateTestId';
import { NameTestId } from 'constants/stringTestId';

type HeroProps = AvatarProps;

const Hero = (props: HeroProps) => {
  const { name, address } = props;
  return (
    <HeroContainer {...props}>
      <Avatar name={name} {...props} />
      <ContainerName>
        <TextName data-testid={generateTestId(NameTestId.heroName)}>
          {name!}
        </TextName>
        <TextAddress data-testid={generateTestId(NameTestId.heroAddress)}>
          {address!}
        </TextAddress>
      </ContainerName>
      <Arrow src={ImagesArrow} style={{ cursor: 'pointer' }} />
    </HeroContainer>
  );
};

export default React.memo(Hero);

import React, { useCallback, useEffect, useState } from 'react';
import { ImagesComponent, InputCustom } from 'components/atoms';
import {
  ImagesLogo,
  ImagesMenu,
  ImagesNotification,
  ImagesSearch,
  ImagesSettings,
} from 'assets/png';
import { Hero } from 'components/moulecules';
import {
  ExpandComponent,
  HeaderContainer,
  HeaderContent,
  HeaderLeft,
  HeaderRight,
  IconMenu,
  IconNotification,
  IconSettings,
  ImageLogoHeader,
} from './Header.styled';
import { useGlobal } from 'hooks/globalContext/GlobalContext';
import { DeviceNames } from 'styles/breakpoints';
import { generateTestId } from 'utils/generateTestId';
import { NameTestId } from 'constants/stringTestId';

const Header = () => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const { state } = useGlobal();

  const handlerExpand = useCallback(() => {
    setIsExpand(!isExpand);
  }, [isExpand]);

  useEffect(() => {
    if (state?.display) {
      if ([DeviceNames.laptop].includes(state.display)) {
        setIsExpand(false);
      }
    }
  }, []);

  return (
    <div style={{ position: 'sticky' }}>
      <HeaderContainer expand={isExpand}>
        <HeaderContent>
          <HeaderRight>
            <IconMenu
              data-testid={generateTestId(NameTestId.buttonExpand)}
              src={ImagesMenu}
              onClick={handlerExpand}
            />
            <ImageLogoHeader src={ImagesLogo} style={{ width: '120px' }} />
            <Hero name="Reinhart H" address="Kemang, Jakarta" />
          </HeaderRight>
          <HeaderLeft>
            <InputCustom iconRight={<ImagesComponent src={ImagesSearch} />} />
            <IconNotification src={ImagesNotification} />
            <IconSettings src={ImagesSettings} />
          </HeaderLeft>
        </HeaderContent>
      </HeaderContainer>
      <ExpandComponent
        data-testid={generateTestId(NameTestId.componentExpand)}
        expand={isExpand}
      >
        <HeaderLeft style={{ display: 'flex', marginBottom: '30px' }}>
          <InputCustom iconRight={<ImagesComponent src={ImagesSearch} />} />
          <IconNotification src={ImagesNotification} />
          <IconSettings src={ImagesSettings} />
        </HeaderLeft>
        <Hero
          style={{ display: 'flex' }}
          name="Reinhart H"
          address="Kemang, Jakarta"
        />
      </ExpandComponent>
    </div>
  );
};

export default React.memo(Header);

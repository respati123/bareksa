import styled from 'styled-components';
import { Box, ImagesComponent } from 'components/atoms';
import React from 'react';
import { device } from 'styles/breakpoints';
import { ImagesComponentProps } from 'components/atoms/images/ImagesComponent';

const IconStyled = styled(ImagesComponent)`
  width: 35px;
  height: 35px;
`;

interface IconBoxNotificationProps {
  isNotification: boolean;
}

interface HeaderContainerProps {
  expand: boolean;
}

const IconBoxNotification = styled(Box)<IconBoxNotificationProps>`
  position: relative;
  margin-right: 0.5rem;
  margin-left: 1rem;

  &:after {
    visibility: ${(props) => (props.isNotification ? 'visible' : 'hidden')};
    content: '';
    border-radius: 50%;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.canceled};
    position: absolute;
  }
`;

export const HeaderRight = styled(Box)`
  align-items: center;
`;

export const HeaderLeft = styled(Box)`
  align-items: center;

  @media ${device.tablet} {
    display: none;
  }
`;

export const HeaderContainer = styled(Box)<HeaderContainerProps>`
  height: 88px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 1s ease-in-out;

  @media ${device.tablet} {
    align-items: center;
  }
`;

export const ExpandComponent = styled(Box)<HeaderContainerProps>`
  transition: all 0.5s ease-in-out;
  flex-direction: column;
  height: ${(props) => (props.expand ? '100%' : '0px')};
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;

  & > * {
    transition: all 0.5s ease-in-out;
    opacity: ${(props) => (props.expand ? 1 : 0)};
  }
`;

export const HeaderContent = styled(Box)`
  width: 100%;
  margin: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const ImageLogoHeader = styled(ImagesComponent)<ImagesComponentProps>`
  width: 9rem;
  height: 2rem;
  margin-right: 3rem;
  display: block;
  position: relative;

  @media ${device.tablet} {
    position: absolute;
    right: 0;
    margin-right: 1rem;
  }
`;

export const IconSettings = styled(IconStyled)`
  position: relative;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  width: 20px;
  height: 20px;
`;

export const IconMenu = styled(IconStyled)`
  width: 20px;
  height: 20px;
  display: none;
  cursor: pointer;

  @media ${device.tablet} {
    display: block;
  }
`;

export const IconNotification = (
  props: React.ImgHTMLAttributes<HTMLImageElement>
) => {
  return (
    <IconBoxNotification isNotification>
      <IconStyled {...props} />
    </IconBoxNotification>
  );
};

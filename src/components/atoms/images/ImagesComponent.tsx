import React from 'react';
import styled from 'styled-components';

export type ImagesComponentProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImagesComponent = styled.img<ImagesComponentProps>``;

export default ImagesComponent;

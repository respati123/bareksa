import React from 'react';
import { themes } from 'styles/themes';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export const WrapperRenderTest = (
  children: React.ReactElement,
  theme: DefaultTheme = themes
) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

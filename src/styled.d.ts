import 'styled-components';
import { IFonts } from 'styles/fonts';
import { IColors } from 'styles/colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: IFonts;
    colors: IColors;
  }
}

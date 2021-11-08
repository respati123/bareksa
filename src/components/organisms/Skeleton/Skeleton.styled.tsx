import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';

export interface SkeletonStyledType {
  type: 'title' | 'text' | 'circle' | 'circle-chart' | 'box' | 'box-filter';
}
export const SkeletonStyled = styled.div<SkeletonStyledType>`
  background-color: ${({ theme }) =>
    convertHexToRgba(theme.colors.background, 0.7)};
  border-radius: 4px;
  margin: 0.5rem;

  ${(props) => {
    const { type } = props;
    switch (type) {
      case 'title':
        return `
                width: 50%;
                height: 30px; 
            `;
      case 'circle-chart':
        return `
                width: 100px;
                height: 100px;
                border-radius: 50%;
            `;
      case 'box-filter':
        return `
                width: 2rem;
                height: 20px;
            `;
      default:
        return '';
    }
  }}
`;

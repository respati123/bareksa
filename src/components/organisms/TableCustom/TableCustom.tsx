import React from 'react';
import styled from 'styled-components';
import { convertHexToRgba } from 'utils/convertHexToRgba';
import { SkeletonComponent } from 'components/organisms';

export type RulesType = {
  name: string;
  data: string; // setup data example: { orders: { id } } = orders.id
  dateFormat?: string;
};

interface TableCustomProps {
  isLoading: boolean;
  data: [];
  rules: RulesType[];
  onHeader?: (item: RulesType) => React.ReactNode;
  onRenderCell?: (item: any, key: RulesType) => React.ReactNode | boolean;
}

const TableCustom = (props: TableCustomProps) => {
  const { rules, onHeader, data, isLoading, onRenderCell } = props;

  const renderTable = (item: RulesType, index: number) => {
    if (onHeader) {
      if (onHeader(item)) {
        return onHeader(item);
      }
    }

    return <th key={`header-${index}`}>{item.name}</th>;
  };

  const renderCell = (order: any) => (item: RulesType) => {
    if (onRenderCell) {
      if (onRenderCell(order, item)) {
        return onRenderCell(order, item);
      }
    }

    return <td>{order[item.data]}</td>;
  };

  const renderBody = (item: any) => {
    return <tr>{rules.map(renderCell(item))}</tr>;
  };

  return (
    <table
      style={{
        width: '100%',
        boxSizing: 'border-box',
        borderCollapse: 'collapse',
      }}
    >
      <TableHeader>
        <tr>{rules.map(renderTable)}</tr>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <SkeletonTable rules={rules} skeletonLength={5} />
        ) : (
          data?.map(renderBody)
        )}
      </TableBody>
    </table>
  );
};

const SkeletonTable = (props: {
  rules: RulesType[];
  skeletonLength: number;
}) => {
  const { skeletonLength, rules } = props;

  const renderSkeleton = (item: number, index: number) => {
    return (
      <tr key={`tr-${index}`}>
        {rules.map(() => (
          <>
            <td>
              <SkeletonComponent isLoading type="title" />
            </td>
          </>
        ))}
      </tr>
    );
  };

  return [...new Array(skeletonLength)].map(renderSkeleton);
};

export default React.memo(TableCustom);

const TableHeader = styled.thead`
  width: auto;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.background};
  ${({ theme }) => theme.fonts.atom600};
  line-height: 56px;
  text-transform: capitalize;
  border-bottom: 1px solid
    ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.5)};
`;

const TableBody = styled.tbody`
  ${({ theme }) => theme.fonts.atom400};

  line-height: 56px;

  tr {
    cursor: pointer;
    border-bottom: 1px solid
      ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.1)};

    :hover {
      background-color: #eff7ff;
    }
  }
`;

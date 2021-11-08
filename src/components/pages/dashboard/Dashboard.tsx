import React, { useCallback, useEffect, useState } from 'react';
import {
  ChartContent,
  ChartConversion,
  ChartRevenue,
  ChartUsers,
  DashboardBox,
  DashboardContent,
  TextDate,
} from './Dashboard.styled';
import { HeaderChart } from 'components/moulecules';
import { useQuery } from 'react-query';
import BaseApi from 'config/BaseApi';
import ChartPie from 'components/organisms/ChartPie/ChartPie';
import {
  Calendar,
  ChartLine,
  ChartPolar,
  TableCustom,
} from 'components/organisms';
import { Box } from 'components/atoms';
import { CardStyled } from 'components/atoms/card/Card.styled';
import { RulesType } from 'components/organisms/TableCustom/TableCustom';
import styled from 'styled-components';
import { device } from 'styles/breakpoints';
import moment from 'moment';

const rules: RulesType[] = [
  {
    name: 'Order Number',
    data: 'order_id',
  },
  {
    name: 'Status',
    data: 'status',
  },
  {
    name: 'Operator',
    data: 'full_name',
  },
  {
    name: 'Location',
    data: 'location',
  },
  {
    name: 'Start Date',
    data: 'start_date',
    dateFormat: 'DD/MM/YYY',
  },
  {
    name: 'Due Date',
    data: 'due_date',
    dateFormat: 'DD/MM/YYY',
  },
];

const Dashboard = () => {
  const { data: dataFetch, isLoading } = useQuery('datas', async () => {
    const result = await BaseApi('token').get('/takehometest/web/dashboard');
    return result.data;
  });
  const [date, setDate] = useState();
  const [dataTable, setDataTable] = useState();
  const [loadingFilter, setLoadingFilter] = useState<boolean>(false);

  const handleFilter = useCallback(
    ({ startDate, endDate }) => {
      setLoadingFilter(true);
      setDate({
        startDate,
        endDate,
      });
      const paramStartDate = moment(startDate).unix();
      const paramEndDate = moment(endDate).unix();

      const data = dataFetch.data?.orders?.filter((d) => {
        const startDateUnix = moment(d.start_date).unix();
        return startDateUnix >= paramStartDate && startDateUnix <= paramEndDate;
      });

      setDataTable((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            data: {
              ...prevState?.data,
              orders: data,
            },
          };
        }
      });

      setTimeout(() => {
        setLoadingFilter(false);
      }, 400);
    },
    [dataTable, isLoading]
  );

  useEffect(() => {
    if (dataFetch) {
      setDataTable(dataFetch);
    }
  }, [dataFetch]);

  const loading = isLoading || loadingFilter;

  return (
    <DashboardBox>
      <TextDate>9 april 2021</TextDate>
      <DashboardContent>
        <ChartContent>
          <ChartConversion>
            <HeaderChart title="conversion" isLoading={loading} />
            <ChartPie data={dataTable} isLoading={loading} />
          </ChartConversion>
          <ChartUsers>
            <HeaderChart title="Users" isLoading={loading} />
            <ChartPolar data={dataTable} isLoading={loading} />
          </ChartUsers>
          <ChartRevenue>
            <HeaderChart title="Revenue" isLoading={loading} noFilter />
            <ChartLine data={dataTable} isLoading={loading} date={date} />
          </ChartRevenue>
        </ChartContent>

        <ContainerBoxTable>
          <Calendar onFilter={handleFilter} />
          <CardStyled style={{ width: '100%' }}>
            <HeaderChart title="Orders" isLoading={loading} />
            <TableCustom
              onHeader={(item) => {
                return (
                  <TableHeading data={item.name}>{item.name}</TableHeading>
                );
              }}
              onRenderCell={(item, key) => {
                if (key.name === 'Order Number') {
                  return <td>{`#${item[key.data].split('-')[1]}`}</td>;
                }

                if (key.name === 'Status') {
                  return (
                    <td>
                      <BoxStatus data={item[key.data]}>
                        {item[key.data]}
                      </BoxStatus>
                    </td>
                  );
                }
                return false;
              }}
              data={dataTable?.data?.orders}
              isLoading={loading}
              rules={rules}
            />
          </CardStyled>
        </ContainerBoxTable>
      </DashboardContent>
    </DashboardBox>
  );
};

const TableHeading = styled.th<{ data: string }>`
  width: ${(props) => {
    const { data } = props;
    if (data === 'Order Number') return '121px';
    if (data === 'Status') return `159px`;
    return 'auto';
  }};
  min-width: 130px;
`;

const ContainerBoxTable = styled(Box)`
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const BoxStatus = styled.div<{ data: string }>`
  text-align: center;
  border-radius: 4px;
  padding: 4px 8px;
  width: 50%;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.atom400};
  background-color: ${(props) => {
    const { data, theme } = props;
    if (data === 'completed') return theme.colors.completed;
    if (data === 'pending') return theme.colors.pending;
    if (data === 'canceled') return theme.colors.canceled;
  }};
  text-transform: capitalize;
`;

export default React.memo(Dashboard);

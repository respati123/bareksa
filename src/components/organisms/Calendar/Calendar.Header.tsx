import { Box } from 'components/atoms';
import { ImagesArrowCalendar } from 'assets/png';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

interface CalendarHeaderProps {
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onPreviousYear: () => void;
  onNextYear: () => void;
  value: moment.Moment;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { value, onPreviousMonth, onPreviousYear, onNextYear, onNextMonth } =
    props;

  const currentMonth = () => {
    return value.format('MMMM');
  };

  const currentYear = () => {
    return value.format('YYYY');
  };

  return (
    <>
      <Box style={{ margin: '1rem' }}>
        <img
          src={ImagesArrowCalendar}
          style={{ transform: 'rotate(0deg)' }}
          onClick={onPreviousMonth}
        />
        <TextHeaderCalendar>{currentMonth()}</TextHeaderCalendar>
        <img
          src={ImagesArrowCalendar}
          style={{ transform: 'rotate(180deg)' }}
          onClick={onNextMonth}
        />
      </Box>
      <Box style={{ margin: '1rem' }}>
        <img
          src={ImagesArrowCalendar}
          style={{ transform: 'rotate(0deg)' }}
          onClick={onPreviousYear}
        />
        <TextHeaderCalendar>{currentYear()}</TextHeaderCalendar>
        <img
          src={ImagesArrowCalendar}
          style={{ transform: 'rotate(180deg)' }}
          onClick={onNextYear}
        />
      </Box>
    </>
  );
};

const TextHeaderCalendar = styled.h1`
  margin: 0rem 2rem;
  ${({ theme }) => theme.fonts.atom600};
`;

export default CalendarHeader;

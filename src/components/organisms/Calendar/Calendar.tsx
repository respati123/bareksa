import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import buildCalendar from './Build';
import CalendarHeader from 'components/organisms/Calendar/Calendar.Header';
import { CardStyled } from 'components/atoms/card/Card.styled';
import { convertHexToRgba } from 'utils/convertHexToRgba';
import { device } from 'styles/breakpoints';

interface CalendarProps {
  onFilter: (item) => void;
}

const Calendar = (props: CalendarProps) => {
  const [value, setValue] = useState(moment());
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [calendar, setCalendar] = useState([]);

  const { onFilter } = props;

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  const handleClickDay = (day) => {
    if (startDate === undefined) {
      return setStartDate(day);
    }

    if (moment(startDate).unix() > moment(day).unix()) {
      setEndDate(startDate);
      setStartDate(day);
    } else {
      setEndDate(day);
    }
  };

  const handlePreviousMonth = () => {
    return value.clone().subtract(1, 'month');
  };
  const handleNextMonth = () => {
    return value.clone().add(1, 'month');
  };
  const handlePreviousYear = () => {
    return value.clone().subtract(1, 'year');
  };
  const handleNextYear = () => {
    return value.clone().add(1, 'year');
  };

  return (
    <CalendarContainer>
      <HeaderCalendar>
        <CalendarHeader
          value={value}
          onPreviousMonth={() => setValue(handlePreviousMonth)}
          onNextMonth={() => setValue(handleNextMonth)}
          onPreviousYear={() => setValue(handlePreviousYear)}
          onNextYear={() => setValue(handleNextYear)}
        />
      </HeaderCalendar>
      <HeaderNameDay>
        {['s', 'm', 't', 'w', 't', 'f', 's'].map((d) => (
          <WeekComponent>{d}</WeekComponent>
        ))}
      </HeaderNameDay>
      <CalendarDay>
        {calendar.map((week, index) => {
          return (
            <div key="week">
              {week.map((day, index) => (
                <DayComponent
                  onClick={() => handleClickDay(day)}
                  key={`day-${index}`}
                  // onToday={value?.isSame(day, 'day')}
                  onSelected={
                    startDate?.isSame(day, 'day') || endDate?.isSame(day, 'day')
                  }
                >
                  {day.format('D').toString()}
                </DayComponent>
              ))}
            </div>
          );
        })}
      </CalendarDay>
      <FilterContainer>
        <ButtonCancel>Cancel</ButtonCancel>
        <ButtonFilter onClick={() => onFilter({ startDate, endDate })}>
          Filter
        </ButtonFilter>
      </FilterContainer>
    </CalendarContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const ButtonCancel = styled.button`
  ${({ theme }) => theme.fonts.atom600};
  background-color: transparent;
  appearance: none;
  border: none;
  margin: 0rem 0.5rem;
  width: 100px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.2)};
`;

const ButtonFilter = styled(ButtonCancel)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

const CalendarDay = styled.div`
  width: auto;
  display: grid;
  position: relative;
  text-align: center;
  min-width: 200px;
`;

const CalendarContainer = styled(CardStyled)`
  width: auto;
  flex-direction: column;
  max-height: 400px;

  @media ${device.mobileL} {
    flex: 1;
  }
`;

const HeaderNameDay = styled.div`
  width: auto;
  display: flex;
  position: relative;
  border-bottom: 1px solid
    ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.2)};
`;

const WeekComponent = styled.div`
  ${({ theme }) => theme.fonts.atom400};
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => convertHexToRgba(theme.colors.gray, 0.5)};
  width: 40px;
  line-height: 40px;
  text-transform: capitalize;
  margin: 0.3rem;
  box-sizing: border-box;
  z-index: 1;
  text-align: center;
`;

const HeaderCalendar = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const DayComponent = styled.div<{ onSelected: boolean; onToday: boolean }>`
  ${({ theme }) => theme.fonts.atom400};
  cursor: pointer;
  position: relative;
  width: 40px;
  min-width: 20px;
  line-height: 40px;
  display: inline-block;
  color: ${(props) => (props.onSelected ? 'white' : 'black')};
  background-color: ${(props) =>
    props.onSelected
      ? '#8772B0'
      : props.onToday
      ? convertHexToRgba(props.theme.colors.gray, 0.5)
      : 'white'};
  margin: 0.3rem;
  border-radius: 50%;
  box-sizing: border-box;
  z-index: 1;
  text-align: center;

  @media ${device.tablet} {
    line-height: 30px;
  }
`;

export default Calendar;

import React, {useEffect, useMemo, useState} from 'react';
import styled from '@emotion/styled/macro';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { isSameDay } from '../../utils';
import {selectedDateState, todoListState} from "./features/TodoList/atom";
import {useRecoilValue, useSetRecoilState} from "recoil";

import CalendarDay from "./CalendarDay";
import TodoFormModal from "./features/TodoFormModal";

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  padding: 8px 24px;
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  color: #F8F7FA;
`;

const ArrowButton = styled.button<{ pos: 'left' | 'right' }>`
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #F8F7FA;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  border-spacing: 0;
`;

const TableHeader = styled.thead`
  padding-block: 12px;
  > tr {
    > th {
      padding-block: 12px;
      font-weight: normal;
      color: #F8F7FA;
    }
  }
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  text-align: center;
  color: #C9C8CC;
  padding: 8px;
  position: relative;
`;

const DisplayDate = styled.div<{ isToday?: boolean; isSelected?: boolean; }>`
  color: ${({ isToday }) => isToday && '#F8F7FA'};
  background-color: ${({ isToday, isSelected }) => isSelected ? '#7047EB' : isToday ? '#313133' : ''};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  align-self: flex-end;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: #28272A;
  ${Header} + ${Table} {
    margin-top: 36px;
  }
`;

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Calendar: React.FC = () => {
    console.log('render Calendar!!!')
    // const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // 선택한 날짜 상태
    const selectedDate = useRecoilValue(selectedDateState)
    const todoList = useRecoilValue(todoListState)
    const setSelectedDate = useSetRecoilState(selectedDateState)

    const { year, month, firstDay, lastDay } = useMemo(() => { // 선택한 날짜를 기준으로 연, 월, 일, 해당 월의 첫째 날짜, 해달 월의 마지막 날짜 가져온다.
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();

        return ({
            year,
            month,
            firstDay: new Date(year, month, 1),
            lastDay: new Date(year, month + 1, 0)
        })
    }, [selectedDate]);

    useEffect(() => {
        if(todoList){
            console.log('todoList!!!:', todoList)
        }
    }, [todoList])

    const selectDate = (date: Date) => {
        setSelectedDate(date);
    }
    const pad = () => Array(firstDay.getDay()).fill(0).map((value:number, index) => <TableData key={`pad_${value+index}`}/>)

    const range = () => Array(lastDay.getDate()).fill(0).map((d: number, index) => {
        const thisDay = new Date(year, month, (d+index) + 1);

        return (
            <CalendarDay date={thisDay}/>
        )
    });

    const render = () => {
        const items = [...pad(), ...range()];
        const weeks = Math.ceil(items.length / 7);
        return Array(weeks).fill(0).map((week: number, index) => {
            console.log(`week: ${week} / index: ${index}`)
            return <tr key={`week_${week}_${index}`}>
                {items.slice((week + index) * 7, (week + index) * 7 + 7)}
            </tr>
        });
    }

    return (
        <Base>

            <Header>
                <ButtonContainer>
                    <ArrowButton pos="left" onClick={() => selectDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}>
                        <BiChevronLeft />
                    </ArrowButton>
                    <Title>{`${MONTHS[month]} ${year}`}</Title>
                    <ArrowButton pos="right" onClick={() => selectDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}>
                        <BiChevronRight />
                    </ArrowButton>
                </ButtonContainer>
            </Header>
            <Table>
                <TableHeader>
                    <tr>
                        {
                            DAYS.map((day, index) => (
                                <th key={day} align="center">{day}</th>
                            ))
                        }
                    </tr>
                </TableHeader>
                <TableBody>
                    {render()}
                </TableBody>
            </Table>
        </Base>
    )
}

export default Calendar;
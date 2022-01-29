import React, {SyntheticEvent} from "react";
import styled from "@emotion/styled/macro";
import {ITodo, selectedTodoState} from "./atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {todoStatisticsModalOpenState} from "../TodoStatisticsModal/atom";

const TodoItem = styled.li<{ done?: boolean, selected?: boolean }>`
  max-width: 100px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({done, selected}) => selected ?
          'rgba(112, 71, 235, 1)' : done ? 'transparent' : 'rgba(112, 71, 235, 0.4)'};
  padding: 2px 4px;
  margin: 0;
  border-radius: 8px;
  font-size: 10px;
  text-decoration: ${({done}) => done && 'line-through'};
  cursor: pointer;
`;

const EtcItem = styled.li`
  padding: 2px 4px;
  margin: 0;
  font-size: 10px;
  cursor: pointer;
`;

const Base = styled.div`
  list-style: none;
  margin: 36px 0 0 0;
  padding: 0;
  width: 100%;
  height: 60px;

  ${TodoItem} + ${TodoItem} {
    margin-top: 1px;
  }

  ${TodoItem} + ${EtcItem} {
    margin-top: 1px;
  }
`;

interface Props{
    items: ITodo[]
}


const TodoList: React.FC<Props> = ({items}) => {

    const selectedTodo = useRecoilValue(selectedTodoState)
    const setSelectedTodo = useSetRecoilState(selectedTodoState)
    const setTodoStatisticsModalOpen = useSetRecoilState(todoStatisticsModalOpenState)

    const handleClick = (event: SyntheticEvent<HTMLLIElement>, todo: ITodo) => {
        event.stopPropagation()
        setSelectedTodo(selectedTodo?.id === todo.id &&
                                    selectedTodo.date === todo.date ? null : todo)
    }
    const handleTodoStatisticsModalOpen = (event:SyntheticEvent<HTMLLIElement>) => {
        event.stopPropagation()
        setTodoStatisticsModalOpen(true)
    }
    return (
        <Base>
            {
                items.slice(0, 3).map((item, index) => (
                    <TodoItem key={item.id} done={item.done} onClick={event=>handleClick(event, item)}>
                        {item.content}
                    </TodoItem>
                ))
            }
            {
                items.length > 3 && (
                    <EtcItem onClick={handleTodoStatisticsModalOpen}>
                        {`etc items: ${items.length - 3}`}
                    </EtcItem>
                )
            }
        </Base>
    )
}

export default TodoList
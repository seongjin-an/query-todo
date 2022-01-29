import React, {useState} from "react";
import styled from "@emotion/styled/macro";
import {HiOutlineTrash} from "react-icons/hi";
import { useRecoilValue, useRecoilState} from "recoil";
import Modal from "../../Modal";
import {todoStatisticsModalOpenState, todoStatisticsState} from "./atom";
import {filteredTodoListState, selectedDateState, todoListState} from "../TodoList/atom";

const ModalBody = styled.div`
  width: 100vw;
  max-width: 386px;
  padding: 8px;
`;

const Date = styled.small`
  display: block;
  color: #C9C8CC;
`;

const TodoActionButton = styled.button<{ secondary?: boolean }>`
  border: none;
  background-color: transparent;
  color: ${({secondary}) => secondary && '#ff6b6b'};
  cursor: pointer;
`;

const TodoActions = styled.span`
  flex: 1 0 5%;
`;

const Content = styled.span`
  flex: 1 0 95%;
`;

const TodoItem = styled.li`
  width: 100%;
  display: flex;
  color: #C9C8CC;
  align-items: center;
  border-radius: 8px;
`;

const TodoList = styled.ul`
  list-style: circle;
  margin: 0;
  padding: 0;
  width: 100%;

  ${TodoItem} + ${TodoItem} {
    margin-top: 8px;
  }
`;

const Statistics = styled.p`
  color: #7047EB;
  font-size: 16px;
  font-weight: bold;
`;

const Card = styled.div`
  width: 100%;
  max-width: 370px;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  box-sizing: border-box;
  background-color: #19181A;
  ${Date} + ${TodoList}{
    margin-top: 24px;
  }
`;

const TodoStatisticsModal: React.FC = () => {
    // const [isOpen, setIsOpen] = useState<boolean>(false)
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const [ isOpen, setIsOpen] = useRecoilState(todoStatisticsModalOpenState)

    const selectedDate = useRecoilValue(selectedDateState)

    const filteredTodoList = useRecoilValue(filteredTodoListState(selectedDate))
    const statistics = useRecoilValue(todoStatisticsState(selectedDate))

    const handleClose = () => setIsOpen(false)

    const removeTodo = (id: string) => {
        setTodoList(todoList.filter(todo => todo.id !== id))
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalBody>
                <Card>
                    <Date>2022-01-29</Date>
                    <Statistics>{statistics.total - statistics.done} jobs remain</Statistics>
                    <TodoList>
                        {
                            filteredTodoList.map(todo => (
                                <TodoItem key={todo.id}>
                                    <Content>{todo.content}</Content>
                                    <TodoActions>
                                        <TodoActionButton secondary onClick={() => removeTodo(todo.id)}>
                                            <HiOutlineTrash/>
                                        </TodoActionButton>
                                    </TodoActions>
                                </TodoItem>
                            ))
                        }
                    </TodoList>
                </Card>
            </ModalBody>
        </Modal>
    )
}

export default TodoStatisticsModal
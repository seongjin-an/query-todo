import React, {ChangeEvent, useState} from "react";
import styled from "@emotion/styled/macro";
import {useRecoilValue, useRecoilState, useRecoilCallback, useSetRecoilState} from "recoil";
import Modal from "../../Modal";
import {ITodo, selectedDateState, todoListState} from "../TodoList/atom";
import {todoFormModalOpenState} from "./atom";
import {getSimpleDateFormat} from "../../../../utils";
import {v4 as uuidv4} from 'uuid';

const ModalBody = styled.div`
  width: 100vw;
  max-width: 386px;
  padding: 8px;
`;

const Date0 = styled.small`
  display: block;
  color: #C9C8CC;
`;

const InputTodo = styled.input`
  padding: 16px 24px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  color: #C9C8CC;
  caret-color: #C9C8CC;
`;

const Card = styled.div`
  width: 100%;
  max-width: 370px;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  box-sizing: border-box;
  background-color: #19181A;

  ${Date} + ${InputTodo} {
    margin-top: 24px;
  }
`;


const TodoFormModal: React.FC = ({}) => {
    console.log('render todoformmodal')

    // const [isOpen, setIsOpen] = useState<boolean>(false);
    const [todo, setTodo] = useState<string>('')
    const [isOpen, setIsOpen] = useRecoilState(todoFormModalOpenState)
    const selectedDate =  useRecoilValue(selectedDateState)
    const setSelectedDate = useSetRecoilState(selectedDateState)
    const todoList = useRecoilValue(todoListState)
    const setTodoList = useSetRecoilState(todoListState)

    const addTodo = useRecoilCallback(({snapshot, set}) => () => {
        const todoList = snapshot.getLoadable(todoListState).getValue()
        const _selectedDate = snapshot.getLoadable(selectedDateState).getValue()
        const newTodo: ITodo = {id: uuidv4(), content: todo, done: false, date: new Date(selectedDate)}
        console.log('addTodo todoList:', todoList);
        console.log('newTodo:', newTodo)
        set<ITodo[]>(todoListState, [...todoList, newTodo])
    }, [todo, todoList])

    // const addTodo = () => {
    //     const _date = new Date(selectedDate)
    //     setTodoList(prev => [...prev, {id: uuidv4(), content: todo, done: false, date: _date}])
    // }

    const reset = () => {
        setTodo('')
    }
    const handleClose = () => setIsOpen(false);

    const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            addTodo();
            reset()
            handleClose();
        }
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value)
    }
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalBody>
                <Card>
                    <Date0>{getSimpleDateFormat(selectedDate)}</Date0>
                    <InputTodo placeholder="new event" onKeyPress={handleKeyPress} value={todo} onChange={handleChange}/>
                </Card>
            </ModalBody>
        </Modal>
    )
}
export default TodoFormModal
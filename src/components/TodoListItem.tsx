import React, {MouseEvent, useCallback} from "react";
import styled from "@emotion/styled";
import {MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline} from "react-icons/md";
import {ITodo} from "../types";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

interface ITodoListItemProps {
    todo: ITodo;
}

const TodoListItem: React.FC<ITodoListItemProps> = ({todo}) => {
    // Access the client
    const queryClient = useQueryClient()
    // api
    const deleteTodo = (id: string) => axios.delete('/todo', {params:{id}})
    const toggleTodo = (id: string) => axios.patch('/todo', {id})
    // Mutations
    const removeMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })
    const toggleMutation = useMutation(toggleTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        }
    })
    const onRemove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        removeMutation.mutate(todo.id)
    }, [todo.id])
    const onToggle = useCallback((event:MouseEvent<HTMLDivElement>) => {
        console.log('on Toggle id:', todo.id)
        toggleMutation.mutate(todo.id)
    }, [todo.id])
    return (
        <StyledTodoListItem>
            <StyledTodoCheckbox checked={todo.completed} onClick={onToggle}>
                {
                    todo.completed ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>
                }
                <StyledTodoInputText checked={todo.completed}>{todo.content}</StyledTodoInputText>
            </StyledTodoCheckbox>
            <StyledRemove onClick={onRemove}>
                <MdRemoveCircleOutline/>
            </StyledRemove>
        </StyledTodoListItem>
    )
}
const StyledRemove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;

  &:hover {
    color: #ff8787;
  }

  & + & {
    border-top: 1px solid #dee2e6;
  }
`
const StyledTodoInputText = styled.div<{ checked: boolean }>`
  margin-left: 05rem;
  flex: 1;
  text-decoration: ${({checked}) => checked && 'line-through'};
`
const StyledTodoCheckbox = styled.div<{ checked: boolean }>`
  cursor: pointer;
  flex: 1; //차지할 수 있는 영역 모두 차지
  display: flex;
  align-items: center;

  svg {
    font-size: 1.5rem;
    color: ${({checked}) => checked && '#22b8cf'};
  }
`
const StyledTodoListItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;

  &:nth-child(even) {
    background: #f8f9fa;
  }
`
export default React.memo(TodoListItem);
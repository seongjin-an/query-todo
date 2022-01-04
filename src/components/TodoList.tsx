import React, {useCallback, useEffect, useState} from "react";
import {
    focusManager,
    QueryCache,
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryResult
} from "react-query";
import axios, {AxiosResponse} from "axios";
import TodoListItem from "./TodoListItem";
import {ITodo} from "../types";
import styled from "@emotion/styled";
import TodoInsert from "./TodoInsert";
import useTodos from "../hooks/useTodos";

const TodoList = () => {
    console.log('render todoList')

    const queryClient = useQueryClient()


    const {isSuccess, data, isError, refetch} = useTodos<ITodo[]>()

    return (
        <StyledTodoListBase>
            <StyledTodoHeader onClick={() => {
                const todos: ITodo[] | undefined = queryClient.getQueryData('todos')
                console.log('todos:', todos)
            }}>일정관리</StyledTodoHeader>
            <StyledTodoContent>
                <TodoInsert refetch={refetch}/>
                <StyledTodoListContainer>
                    {data?.data.map((todo: ITodo, index: number) => (
                        <TodoListItem key={todo.id} todo={todo}/>
                    ))}
                </StyledTodoListContainer>
            </StyledTodoContent>
        </StyledTodoListBase>
    )
}
const StyledTodoListContainer = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`
const StyledTodoContent = styled.div`
  background: white;
`;
const StyledTodoHeader = styled.div`
  background-color: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledTodoListBase = styled.div`
  width: 512px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`
export default TodoList
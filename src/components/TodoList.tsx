import React, {useCallback, useEffect} from "react";
import {useMutation, useQuery, useQueryClient, UseQueryResult} from "react-query";
import axios, {AxiosResponse} from "axios";
import TodoListItem from "./TodoListItem";
import {ITodo} from "../types";
import styled from "@emotion/styled";
import TodoInsert from "./TodoInsert";

const TodoList = () => {
    const queryClient = useQueryClient();
    // api
    const getTodos = () => axios.get('/todos')

    // Queries
    const {isSuccess, data, isError}: UseQueryResult<AxiosResponse<ITodo[], Error>> = useQuery('todos', getTodos)

    return (
        <StyledTodoListBase>
            <StyledTodoHeader>일정관리</StyledTodoHeader>
            <StyledTodoContent>
                <TodoInsert/>
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
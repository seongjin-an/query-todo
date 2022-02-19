import React, {MouseEvent, ChangeEvent, useCallback, useState, useEffect} from "react";
import styled from "@emotion/styled";
import {MdAdd} from 'react-icons/md'
import {ITodo} from "../types";
import axios, {AxiosResponse} from "axios";
import {useMutation, useQueryClient} from "react-query";
import {QueryObserverResult, RefetchOptions, RefetchQueryFilters} from "react-query/types/core/types";
interface ITodoInsert {
    refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<AxiosResponse<ITodo[], Error>, unknown>>
}
const TodoInsert: React.FC<ITodoInsert> = ({refetch}) => {
    // Access the client
    const queryClient = useQueryClient()
    // api
    const postTodo = (todo: ITodo) => axios.post('/todo', todo)
    // Mutations
    const mutation = useMutation(postTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })


    const  [value, setValue] = useState<string>('')
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, [])
    return (
        <StyledInsertForm>
            <StyledInput placeholder="something to do" value={value} onChange={onChange} onClick={()=>refetch!()}/>
            <StyledInputButton type="submit" onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
                console.log('submit')
                mutation.mutate({
                    id: Date.now().toString(),
                    content: value,
                    completed: false
                })
                setValue("")
            }}>
                <MdAdd/>
            </StyledInputButton>
        </StyledInsertForm>
    )
}
const StyledInputButton = styled.button`
  background: none;
  outline: none;
  border: none;
  background: #868e96;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background ease-in;
  &:hover{
    background: #adb5bd;
  }
`
const StyledInput = styled.input`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;

  &::placeholder {
    color: #dee2e6;
  }

  flex: 1; // 버튼을 제외한 영역을 모두 차지한다.
`
const StyledInsertForm = styled.form`
  display: flex;
  background: #495057;
`
export default TodoInsert
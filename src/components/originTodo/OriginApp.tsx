import React, {useState, useRef, useCallback, useReducer, Reducer} from 'react';
import TodoTemplate from './Template';
import TodoInsert from './Insert';
import TodoList from './List';
import {ITodoAction, ITodoState, TodoActionType, todoReducer} from "./todoReducer";

export interface Todo {
    id: number;
    text: string;
    checked: boolean;
}

const createBulkTodos = (): { todos: Todo[] } => {
    return {
        todos: Array(2500).fill(0).map((_, index) => ({
            id: index,
            text: `todo ${index + 1}`,
            checked: false
        }))
    }
}
const App = () => {
    // const [todos, setTodos] = useState([
    //     {
    //         id: 1,
    //         text: '리액트의 기초 알아보기',
    //         checked: true,
    //     },
    //     {
    //         id: 2,
    //         text: '컴포넌트 스타일링해 보기',
    //         checked: true,
    //     },
    //     {
    //         id: 3,
    //         text: '일정 관리 앱 만들어 보기',
    //         checked: false,
    //     },
    // ]);
    // const [todos, setTodos] = useState(createBulkTodos)
    const [state, dispatch] = useReducer<Reducer<ITodoState, ITodoAction>, undefined>(todoReducer, undefined, createBulkTodos)

    // 고유 값으로 사용 될 id
    // ref 를 사용하여 변수 담기
    const nextId = useRef(2501);

    const onInsert = useCallback(
        (text) => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            // setTodos(todos.concat(todo));
            // setTodos(todos => todos.concat(todo));
            dispatch({type: TodoActionType.INSERT, payload: todo})
            nextId.current += 1; // nextId 1 씩 더하기
        },
        [],
    );

    const onRemove = useCallback(
        (id) => {
            // setTodos(todos.filter((todo) => todo.id !== id));
            // setTodos(todos => todos.filter((todo) => todo.id !== id));
            dispatch({type: TodoActionType.REMOVE, payload: {id}})
        },
        [],
    );

    const onToggle = useCallback(
        (id) => {
            // setTodos(
            //     // todos.map((todo) =>
            //     //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
            //     // ),
            //     todos => todos.map((todo) =>
            //         todo.id === id ? {...todo, checked: !todo.checked} : todo,
            //     ),
            // );
            dispatch({type: TodoActionType.TOGGLE, payload: {id}})
        },
        [],
    );

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert}/>
            <TodoList todos={state.todos} onRemove={onRemove} onToggle={onToggle}/>
        </TodoTemplate>
    );
};

export default App;
import React from 'react';
import TodoListItem from './ListItem';
import './List.scss';
import {Todo} from "./OriginApp";

interface IProps{
    todos: Todo[];
    onRemove: (id: number) => void;
    onToggle: (id: number) => void;
}

const TodoList: React.FC<IProps> = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TodoList;
import { atom, atomFamily, selectorFamily } from "recoil";
import {isSameDay} from "../../../../utils";

export interface ITodo{
    id: string;
    content: string;
    done: boolean;
    date: Date;
}

export const todoListState = atom<ITodo[]>({
    key: 'todoListState',
    default: []
})

export const selectedDateState = atom<Date>({
    key: 'selectedDateState',
    default: new Date()
})

export const selectedTodoState = atom<ITodo | null>({
    key: 'selectedTodoState',
    default: null
})

export const filteredTodoListState = atomFamily<ITodo[], Date>({
    key: 'filteredTodoListState',
    default: selectorFamily({
        key: 'filteredTodoListState/default',
        get: (selectedDate) => ({get}) => {
            const todoList = get(todoListState);
            todoList.forEach(todo => isSameDay(todo.date, selectedDate) ? console.log('selectedDate:',selectedDate, ' / todo.date:', todo.date) : null)
            return todoList.filter(todo => isSameDay(todo.date, selectedDate))
        }
    })
})
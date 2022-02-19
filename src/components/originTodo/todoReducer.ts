import {Todo} from "./OriginApp";
export enum TodoActionType{
    INSERT, REMOVE, TOGGLE
}
type PayloadType = Todo | {id: number}
export interface ITodoAction{
    type: TodoActionType;
    payload: PayloadType
}

export interface ITodoState{
    todos: Todo[]
}

export const todoReducer = (state: ITodoState, action: ITodoAction) => {
    console.log('state: ', state, ' / action: ', action);
    switch(action.type){
        case TodoActionType.INSERT:
            return{
                ...state,
                todos: state.todos.concat(action.payload as Todo)
            }
        case TodoActionType.REMOVE:
            return{
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            }
        case TodoActionType.TOGGLE:
            return{
                ...state,
                todos: state.todos.map(
                    todo => todo.id === action.payload.id ? {...todo, checked: !todo.checked} : todo
                )
            }
        default:
            return state
    }
}
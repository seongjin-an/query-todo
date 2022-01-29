import React from "react";
import {atom, selector, useRecoilValue} from "recoil";
import axios, {AxiosResponse} from "axios";

interface IRecoilTodo{
    userId: number;
    id: number;
    title: string;
    completed: boolean
}

const todoIdState = atom<number>({
    key: "todoIdState",
    default: 1
})

const todoItemQuery = selector<IRecoilTodo>({
    key: "todoItemQuery",
    get: async opts => {
        console.log('opts:', opts)
        const id = opts.get<number>(todoIdState)
        const response = await axios.get<IRecoilTodo, AxiosResponse<IRecoilTodo>, {}>(`https://jsonplaceholder.typicode.com/todos/${id}`)
        return response.data
    }
})

const RecoilApp = () => {
    const data = useRecoilValue<IRecoilTodo>(todoItemQuery)
    return (
        <div>
            {data.title}
            {data.userId}
        </div>
    )
}
export default RecoilApp
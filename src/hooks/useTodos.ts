import axios, {AxiosResponse} from "axios";
import {QueryClient, useQuery, UseQueryResult} from "react-query";
import {useMemo} from "react";
import {fakes} from "../mocks/handlers";
import {ITodo} from "../types";

const getTodos = () => axios.get('/todos')
const fakeApi = () => axios.get('/fake')
const fakeApi2 = async (): Promise<ITodo[]> => {
    const {data} = await axios.get('/fake')
    return data
}
const getTodos2 = async (): Promise<ITodo[]> => {
    const { data } = await axios.get(
        '/todos',
    );
    return data;
};

const queryClient = new QueryClient();
const imsi = ():number => 23

const useTodos = <T>(): UseQueryResult<AxiosResponse<T, Error>> => {
    const result = useQuery('todos', getTodos)
    return result
}

export default useTodos
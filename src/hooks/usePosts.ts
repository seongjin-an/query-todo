import {useQuery, UseQueryResult} from "react-query";
import axios, {AxiosResponse} from "axios";
import {IPost} from "./usePost";

const getPosts = async () => {
    const { data } = await axios.get(
        // "https://jsonplaceholder.typicode.com/posts"
        "/posts"
    );
    return data;
};

export default function usePosts(): UseQueryResult<IPost[], Error> {
    return useQuery("posts", getPosts);
}

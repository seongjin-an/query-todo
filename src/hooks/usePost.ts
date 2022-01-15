import {useQuery, UseQueryResult} from "react-query";
import axios, {AxiosResponse} from "axios";

export interface IPost{
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const getPostById = async (postId: number) => {
    const { data } = await axios.get(
        // `https://jsonplaceholder.typicode.com/posts/${postId}`
        `/post/${postId}`
    );
    return data;
};

export default function usePost(postId: number): UseQueryResult<IPost, Error> {
    return useQuery(
        {
            queryKey: ["post", postId],
            queryFn: () => getPostById(postId),
            refetchOnWindowFocus: false,
            // enabled: false
        });
}
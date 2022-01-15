import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import usePost from "../hooks/usePost";
import Posts from "./Posts";
import Post from "./Post";

const queryClient = new QueryClient();

const PostApp = ()=> {
    const [postId, setPostId] = React.useState<number>(-1);

    return (
        <QueryClientProvider client={queryClient}>
            <p>
                This example is exactly the same as the basic example, but each query
                has been refactored to be it's own custom hook. This design is the
                suggested way to use React Query, as it makes it much easier to manage
                query keys and shared query logic.
            </p>
            {postId > -1 ? (
                <Post postId={postId} setPostId={setPostId} />
            ) : (
                <Posts setPostId={setPostId} />
            )}
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    );
}

export default PostApp
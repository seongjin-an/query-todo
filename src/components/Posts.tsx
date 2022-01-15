import {useQueryClient} from "react-query";
import usePosts from "../hooks/usePosts";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import {getPostById} from "../hooks/usePost";

interface IPostsProps{
    setPostId: Dispatch<SetStateAction<number>>
}
const Posts: React.FC<IPostsProps> = ({ setPostId }) => {
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = usePosts();

    return (
        <div>
            <h1 onClick={() => {
                const some = queryClient.getQueryData(["posts"])
                console.log('some:', some)
            }}>Posts</h1>
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error}</span>
                ) : (
                    <>
                        <div>
                            {data?.map((post) => (
                                <p key={post.id}>
                                    <a
                                        onClick={() => setPostId(post.id)}
                                        href="#"
                                        style={
                                            // We can use the queryCache here to show bold links for
                                            // ones that are cached
                                            queryClient.getQueryData(["post", post.id])
                                                ? {
                                                    fontWeight: "bold",
                                                    color: "green",
                                                }
                                                : {}
                                        }
                                    >
                                        {post.title}
                                    </a>
                                    <span onClick={() => {
                                        const pos = queryClient.getQueryData(['post', post.id])
                                        pos ? console.log('post:', post) : console.log('no data')

                                    }}>check cache</span>
                                </p>
                            ))}
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>
                    </>
                )}
            </div>
        </div>
    );
}
export default Posts
import usePost, {IPost} from "../hooks/usePost";
import React, {ChangeEvent, MouseEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";

interface IPostProps{
    postId: number;
    setPostId: Dispatch<SetStateAction<number>>;
}

const Post: React.FC<IPostProps> = ({ postId, setPostId }) => {
    const queryClient = useQueryClient();

    const { status, data, error, isFetching } = usePost(postId);
    const [mode, setMode] = useState<number>(0);

    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')

    useEffect(() => {
        if(data && mode !== 0){
            setTitle(data?.title)
            setBody(data?.body)
        }
        return() => {
            if(mode !==0){
                console.log('title and body unmount')
                setTitle('')
                setBody('')
            }
        }
    },[mode])



    const modifyPost = (post: IPost) => axios.put('/post', post)
    const modifyMutation = useMutation(modifyPost, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['post', postId])
        },
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(event.target.name === 'title'){
            setTitle(event.target.value)
        }
        if(event.target.name === 'body'){
            setBody(event.target.value)
        }
    }
    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log('title:', title, ' / body:', body)
        const post = {...data, title: title, body: body}
        console.log('post:', post)
        modifyMutation.mutate(post as IPost)
        // setPostId(-1)
        setMode(0);
    }
    const deletePost = (id: number) => axios.delete(`/post/${id}`)
    const deleteMutation = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', postId])
            queryClient.invalidateQueries(['posts'])
        }
    })
    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        deleteMutation.mutate(postId)
        setMode(0)
        setPostId(-1)
    }
    return (
        <div>
            <div>
                <a onClick={() => setPostId(-1)} href="#">
                    Back
                </a>
                <button onClick={()=>setMode(1)}>update</button>
                <button onClick={handleDelete}>delete</button>
            </div>
            {!postId || status === "loading" ? (
                "Loading..."
            ) : status === "error" ? (
                <span>Error: {error}</span>
            ) : (
                mode === 0 ?
                <>
                    <h1>{data?.title}</h1>
                    <div>
                        <p>{data?.body}</p>
                    </div>
                    <div>{isFetching ? "Background Updating..." : " "}</div>
                </> :
                <>
                    <h1><input type="text" name="title" value={title} onChange={handleChange}/></h1>
                    <div>
                        <textarea name="body" value={body} onChange={handleChange}/>
                    </div>
                    <div>{isFetching ? "Background Updating..." : " "}</div>
                    <button onClick={handleSubmit}>update</button>
                    <button onClick={()=>setMode(0)}>cancel</button>
                </>
            )}
        </div>
    );
}
export default Post
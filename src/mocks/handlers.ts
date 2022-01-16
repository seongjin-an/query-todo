import {PathParams, rest, RestRequest} from 'msw'
import {ITodo} from "../types";
import posts from "./data";
import {IPost} from "../hooks/usePost";
let todos: ITodo[] = [
    {
        id: 'todo3',
        content: 'todo3',
        completed: false
    },
    {
        id: 'todo2',
        content: 'todo2',
        completed: true
    },
    {
        id: 'todo1',
        content: 'todo1',
        completed: false
    }
]
export let fakes: ITodo[] = [
    {
        id: 'fake3',
        content: 'fake3',
        completed: false
    },
    {
        id: 'fake2',
        content: 'fake2',
        completed: true
    },
    {
        id: 'fake1',
        content: 'fake1',
        completed: false
    }
]
let localPosts: IPost[] = posts
export const handlers = [
    rest.get('/fake', (req, res, ctx)=>{
        return res(
            ctx.json(
                fakes
            )
        )
    }),
    rest.get('/todos', (req, res, ctx) => {
        return res(
            ctx.json(
                todos
            ),
        )
    }),
    rest.post('/todo', (req:RestRequest<ITodo>, res, ctx) => {
        console.log('req:', req);
        // todos.push([req.body, ...todos]);
        todos = [req.body, ...todos]
        return res(
            ctx.status(200)
        )
    }),
    rest.patch('/todo', (req:RestRequest<ITodo>, res, ctx) => {
        todos = todos.map(todo => todo.id === req.body.id ? {...todo, completed: !todo.completed} : todo)
        return res(
            ctx.status(200)
        )
    }),
    rest.delete('/todo', (req, res, ctx) => {
        const id = req.url.searchParams.get('id')
        console.log('delete...id:', id)
        todos = todos.filter(todo => todo.id !== id)
        return res(
            ctx.status(200)
        )
    }),
    rest.post('/login', (req, res, ctx) => {
        // Persist user's authentication in the session
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            // Respond with a 200 status code
            ctx.status(200),
        )
    }),
    rest.get('/user', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        const isAuthenticated = sessionStorage.getItem('is-authenticated')
        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                }),
            )
        }
        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json({
                username: 'admin',
            }),
        )
    }),

    rest.get('/posts', (req, res, ctx) => {
        console.log('fake posts request')
        return res(
            ctx.status(200),
            ctx.json(localPosts)
        )
    }),

    rest.get('/post/:postId', (req, res, ctx) => {
        const { postId } = req.params
        console.log('fake post request, postId:', postId)
        return res(
            ctx.status(200),
            ctx.json(localPosts.find(post => post.id === parseInt(postId as string)))
        )
    }),

    rest.put('/post', (req:RestRequest<IPost, PathParams>, res, ctx) => {
        console.log('req.body:', req.body)
        console.log('req.body.id:', req.body.id)
        const imsi = localPosts.map(post => post.id === req.body.id ? req.body : post)
        localPosts = imsi
        return res(
            ctx.status(200)
        )
    }),
    rest.delete('/post/:id', (req, res, ctx) => {
        const { id } = req.params
        localPosts = localPosts.filter(post => post.id !== parseInt(id as string))
        return res(
            ctx.status(200)
        )
    })
]
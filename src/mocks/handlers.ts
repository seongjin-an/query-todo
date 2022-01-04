import {rest, RestRequest} from 'msw'
import {ITodo} from "../types";
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
]
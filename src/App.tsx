import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import PostApp from "./components/PostsApp";
import MouseTracker from "./components/hoc/MouseTracker";

function App() {
  return <>
    {/*<TodoList/>*/}
    {/*<PostApp/>*/}
    <MouseTracker/>
  </>
}

export default App;

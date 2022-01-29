import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import PostApp from "./components/PostsApp";
import MouseTracker from "./components/hoc/MouseTracker";
import RecoilTop from "./components/recoilTodo/RecoilTop";

function App() {
  return <>
    {/*<TodoList/>*/}
    {/*<PostApp/>*/}
    {/*<MouseTracker/>*/}
    <RecoilTop/>
  </>
}

export default App;

import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import PostApp from "./components/PostsApp";
import MouseTracker from "./components/hoc/MouseTracker";
import RecoilTop from "./components/recoilTodo/RecoilTop";
import Counter from "./components/counter/Counter";
import OriginApp from "./components/originTodo/OriginApp";

function App() {
  return <>
    {/*<Counter/>*/}
    <OriginApp/>
    {/*<TodoList/>*/}
    {/*<PostApp/>*/}
    {/*<MouseTracker/>*/}
    {/*<RecoilTop/>*/}
  </>
}

export default App;

import { useState } from "react";
import './Main.css';
import TodoList from "../TodoList/TodoList";
import Inputfield from "../Inputfield/Inputfield";
import {useDispatch} from 'react-redux'
import { addTodo } from "../../store/todoSlice";

function Main() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const addTask = () => {
        dispatch(addTodo({text}))
        setText('')
    }
    return (
        <section className="main">
            <Inputfield text={text} setText={setText} addTodo={addTask}/>
            <TodoList/>
        </section>
    );
}

export default Main;

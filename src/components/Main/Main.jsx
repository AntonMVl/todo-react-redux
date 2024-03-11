import { useState } from "react";
import './Main.css';
import TodoList from "../TodoList/TodoList";
import Inputfield from "../Inputfield/Inputfield";
import {useDispatch, useSelector} from 'react-redux'
import { addTodo } from "../../store/todoSlice";

function Main() {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const {status, error} = useSelector(state => state.todos)
    
    const addTask = () => {
        dispatch(addTodo({title}))
        setTitle('')
    }
    return (
        <section className="main">
            <Inputfield title={title} setTitle={setTitle} addTodo={addTask}/>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}
            <TodoList/>
        </section>
    );
}

export default Main;

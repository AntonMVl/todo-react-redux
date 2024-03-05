import { useState } from "react";
import './Main.css';


function Main() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    const addTodo = () => {
        if (text.trim().length) {
            setTodos([
                ...todos,
                {
                    id: new Date().toISOString(),
                    text,
                    completed: false,
                }
            ])
        }
    }

    const toggleTodoComplete = (todoId) => {
        setTodos(
            todos.map(todo => {
                if (todo.id !== todoId) return todo;

                return {
                    ...todo,
                    completed: !todo.completed,
                }
            })
        )
    }

    const removeTodo = (todoId) => {
        setTodos(todos.filter(todo => todo.id !== todoId))
    }

    return (
        <section className="main">
            <label className="main__label">
                <input className="main__input" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button className="main__input-buton" onClick={addTodo}>Добавить</button>
            </label>
            <ul className="main__list">
                {todos.map(todo => <li className="main__list-item" key={todo.id}>
                    <input type="checkbox" name="todo-check" className="main__list-item-checkbox" checked={todo.completed} onChange={() => toggleTodoComplete(todo.id)}/>
                    <span className="main__list-item-text">{todo.text}</span>
                    <button className="main__list-item-delete-button" onClick={() => removeTodo(todo.id)}>Удалить</button>
                </li>)}</ul>
        </section>
    );
}

export default Main;

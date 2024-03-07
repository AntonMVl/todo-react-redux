import './TodoItem.css';
import {useDispatch} from 'react-redux'
import { removeTodo, toggleTodoComplete } from "../../store/todoSlice";


function TodoItem({id, text, completed}) {
    const dispatch = useDispatch();
        return (
            <li className="todo-item__list-item">
                <input type="checkbox" name="todo-check" className="todo-item__list-item-checkbox" checked={completed} onChange={() => dispatch(toggleTodoComplete({id}))}/>
                <span className="todo-item__list-item-text">{text}</span>
                <button className="todo-item__list-item-delete-button" onClick={() => dispatch(removeTodo({id}))}>Удалить</button>
            </li>
    )
}

export default TodoItem
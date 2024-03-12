import './TodoItem.css';
import {useDispatch} from 'react-redux'
import { toogleTaskStatus, deleteTodo } from "../../store/todoSlice";


function TodoItem({id, title, completed}) {
    const dispatch = useDispatch();
        return (
            <li className="todo-item__list-item">
                <input type="checkbox" name="todo-check" className="todo-item__list-item-checkbox" checked={completed} onChange={() => dispatch(toogleTaskStatus(id))}/>
                <span className="todo-item__list-item-text">{title}</span>
                <button className="todo-item__list-item-delete-button" onClick={() => dispatch(deleteTodo(id))}>Удалить</button>
            </li>
    )
}

export default TodoItem
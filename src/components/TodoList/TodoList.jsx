import './TodoList.css'
import {useSelector} from 'react-redux'
import TodoItem from '../TodoItem/TodoItem';

function TodoList() {
    const todos = useSelector(store => store.todos.todos)

    return (
        <ul className='todo-list__list'>
            {todos.map(todo => <TodoItem key={todo.id} {...todo}/>)}
        </ul>
    )
}

export default TodoList;
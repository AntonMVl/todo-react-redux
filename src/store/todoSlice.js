import {createSlice} from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo(store, action) {
            if (action.payload.text !== '') {
                store.todos.push({
                    id: new Date().toISOString(),
                    text: action.payload.text,
                    completed: false,})
            } 
        },
        toggleTodoComplete(store, action) {
            const toggledTodo = store.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(store, action) {
            store.todos = store.todos.filter(todo => todo.id !== action.payload.id)
        },
    }
})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if(res.ok === false) {
                throw new Error('Server error');
            }
            const data = await res.json();
            return data
        } catch(error) {
            return rejectWithValue(error.message);
        }        
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(store, action) {
            if (action.payload.title !== '') {
                store.todos.push({
                    id: new Date().toISOString(),
                    title: action.payload.title,
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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    },
})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;
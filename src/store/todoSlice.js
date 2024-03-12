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

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            })

            if (res.ok === false) {
                throw new Error('I can not delete the task. Server error')
            }

            dispatch(removeTodo({id}))

        } catch(error) {
            return rejectWithValue(error.message);

        }
    }
)

export const toogleTaskStatus = createAsyncThunk (
    'todos/toogleTodo',
    async function(id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id)
        try {
            const  res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({completed: !todo.completed})
            })

            if (res.ok === false) {
                throw new Error('I can not toogle the task. Server error')
            }

            dispatch(toggleTodoComplete({id}))

           
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const postTodo = createAsyncThunk(
    'todos/postTodo',
    async function(title, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: title,
                userID: 1,
                completed: false,
            }

            const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            }

            )
            if(res.ok === false) {
             throw new Error('I can not post todo')   
            }

            const  data = await res.json()
            console.log(data);

            dispatch(addTodo(data))

        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
    )

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(store, action) {
                store.todos.push(action.payload)
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
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(toogleTaskStatus.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(postTodo.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    },
})

const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;
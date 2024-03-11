import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { fetchTodos } from '../store/todoSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchTodos());
    }, []);

    return (
        <div className="body">
            <div className="page">
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;


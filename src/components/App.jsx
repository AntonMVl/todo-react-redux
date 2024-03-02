import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './Main/Main';

function App() {
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


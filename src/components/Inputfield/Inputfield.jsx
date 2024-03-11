import './Inputfield.css'

function Inputfield({title, addTodo, setTitle}) {
    return (
        <label className="input-field__label">
            <input className="input-field__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className="input-field__input-buton" onClick={addTodo}>Добавить</button>
        </label>
    )
}

export default Inputfield
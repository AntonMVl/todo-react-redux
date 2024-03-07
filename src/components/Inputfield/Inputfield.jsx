import './Inputfield.css'

function Inputfield({text, addTodo, setText}) {
    return (
        <label className="input-field__label">
            <input className="input-field__input" type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="input-field__input-buton" onClick={addTodo}>Добавить</button>
        </label>
    )
}

export default Inputfield
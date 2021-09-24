
import axios from 'axios';
import { useState } from 'react';
import './Task.css';

function Task({ item, removeTask, changeDone, changeLike }) {

    const [inputChange, useInputChange] = useState('input-change');
    const [btnChange, useBtnChange] = useState('btn-change');
    const [newText, setNewText] = useState('');

    const handleChangeTask = () => {
        useInputChange('show')
        useBtnChange('hide')
        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape') {
                useBtnChange('show'),
                useInputChange('hide')
            }
        })
    }

    const changeTask = (id, text) => {
        axios.put(`http://localhost:3002/tasks/${id}`, {
            text: newText
        }, 
        {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data, 'NEWtext')
                dispatch({
                    type: "CHANGE_TASK",
                    payload: res.data
                })
            })
    }


    return (
        <div
            className={item.done ? 'task checked' : 'task'}
            key={item.id}
        >
            <button
                className={btnChange}
                onClick={() => handleChangeTask()}
            >
                change text
            </button>
            <form onSubmit={(e) => changeTask(item._id, item.text)}>
                <input
                    className={inputChange}
                    placeholder='change text'
                    onChange={(e) => setNewText(e.target.value)}
                />
            </form>
            <p
                className={item.like ? 'task__like like' : 'task__like'}
                onDoubleClick={() => changeLike(item._id, item.like)}
            >
                {item.text}
            </p>
            <input
                type='checkbox'
                checked={item.done}
                onChange={() => changeDone(item._id, item.done)}
            />
            <button
                onClick={() => removeTask(item._id)}
            >
                delete
            </button>
        </div>
    );
}

export default Task;
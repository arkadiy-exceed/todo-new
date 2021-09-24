import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './TaskCreate.css';

import axios from 'axios';

function TaskCreate() {

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('')

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3002/tasks/', {
      text: inputValue,
      like: false,
      done: false
    }, 
    {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(res => {
      console.log(res)
        dispatch({
            type: "ADD_TASK",
            payload: res.data
        })

        setInputValue('')
    })
    .catch((e) => {
        console.error(e)
    })
  }

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <input
        className='task-form__input'
        placeholder='add new task'
        type='text'
        value={inputValue}
        onChange={handleChange}
      />

      <button
        className='task-form__btn'
      >
        add
      </button>
    </form>
  );
}

export default TaskCreate;

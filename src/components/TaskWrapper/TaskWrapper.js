import { useEffect } from 'react';
import Task from '../Task/Task';
import TaskCreate from '../TaskCreate/TaskCreate';
import './TaskWrapper.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function TaskWrapper() {

    const dispatch = useDispatch()
    const { tasks, newArray } = useSelector(state => state.tasksReducer);
    console.log(tasks, "tasks")


    const postNew = () => {
        axios.post('http://localhost:3002/tasks/new', {
            firstName: 'Ivan',
            lastName: 'Ivanov'
        })
            .then(res => {
                console.log('resdata', res.data)
                dispatch({
                    type: 'POST_NEW',
                    payload: res.data
                })
            })       
    }
    
    const removeTask = (id) => {
        axios.delete(`http://localhost:3002/tasks/${id}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch({
                    type: "REMOVE_TASK",
                    payload: res.data._id
                })
            })
    }

    const changeDone = (id, done) => {
        axios.put(`http://localhost:3002/tasks/${id}`, {
            done: !done
        }, 
        {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res)
                dispatch({
                    type: 'TASK_DONE',
                    payload: res.data
                })
            })
    }

    const changeLike = (id, like) => {
        axios.put(`http://localhost:3002/tasks/${id}`, {
            like: !like
        }, 
        {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch({
                    type: 'TASK_LIKE',
                    payload: res.data
                })
            })

    }

    const exit = () => {
        localStorage.removeItem('token')
        dispatch({
            type: "AUTH",
            payload: false
        })
    }

    useEffect(() => {
        axios.get('http://localhost:3002/tasks/', 
            {
                headers: {
                    token: localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch({
                    type: 'GET_TASKS',
                    payload: res.data
                })
            })
    }, [])

    return (
        <div className="task-wrapper">
            <header className='header'>todo list</header>

            <button onClick={() => exit()}>exit</button>

            <TaskCreate />
            {console.log(tasks)}

            {tasks.map(item => {
                return (
                    <Task
                        key={item._id}
                        item={item}
                        removeTask={removeTask}
                        changeDone={changeDone}
                        changeLike={changeLike}
                    />
                )
            })}

            <button
                onClick={postNew}
            >new</button>
        </div>
    );
}

export default TaskWrapper;

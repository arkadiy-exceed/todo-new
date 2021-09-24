const defaultState = {
    tasks: [],
    news: []
}

export const tasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {...state, tasks: [...state.tasks, action.payload]}
        case "REMOVE_TASK":
            return {...state, tasks: state.tasks.filter(item => item._id !== action.payload)}
        case 'GET_TASKS':
            return {...state, tasks: action.payload}
        case 'CHANGE_TASK': 
            return {...state, tasks: state.tasks.map(item => {
                if(action.payload._id === item._id) {
                    return {...item, text: action.payload.text}
                }
                return item
            })}
        case 'TASK_DONE':
            return {...state, tasks: state.tasks.map(item => {
                if (action.payload._id === item._id) {
                    return {...item, done: action.payload.done}
                }
                return item
            })}
        case 'TASK_LIKE':
            return {...state, tasks: state.tasks.map(item => {
                if (action.payload._id === item._id) {
                    return {...item, like: action.payload.like}
                }
                return item
            })}
        case 'POST_NEW':
            console.log('news', state.news)
            return {...state, news: [...state.news, action.payload]}
        default: 
            return state
    }
}


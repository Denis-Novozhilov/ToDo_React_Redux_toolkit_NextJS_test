import { createSlice } from '@reduxjs/toolkit'

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        tasksList: ['initial_task_01', 'initial_task_02'],
        checkedTasks: [],
    },
    reducers: {
        addTaskToList(state, action) {
            state.tasksList.unshift(action.payload)
        },
        removeTaskFromList(state, action) {
            state.tasksList = state.tasksList.filter(task => task !== action.payload)
        },
        addToCheckedTasks(state, action) {
            state.checkedTasks.unshift(action.payload)
        },
        removeCheckedTasks(state, action) {
            state.checkedTasks = state.checkedTasks.filter(task => task !== action.payload)
        },
    }
});

export default toolkitSlice.reducer;
export const { addTaskToList, removeTaskFromList, addToCheckedTasks, removeCheckedTasks: removeCheckedTasks } = toolkitSlice.actions

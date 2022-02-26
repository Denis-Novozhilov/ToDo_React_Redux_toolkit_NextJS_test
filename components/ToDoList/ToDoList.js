import { useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    addTaskToList,
    removeTaskFromList,
    addToCheckedTasks,
    removeFromCheckedTasks
} from '../../toolkitRedux/toolkitSlice';
import { v4 as uuidv4 } from 'uuid';
import s from '../../styles/ToDoList.module.scss';
import cn from 'classnames';

const InputField = () => {

    const tasksList = useSelector(state => state.toolkit.tasksList);
    const checkedTasks = useSelector(state => state.toolkit.checkedTasks);
    const dispatch = useDispatch();

    const [validity, setValidity] = useState(false);
    const inputRef = useRef();

    const onAddTasksHandler = (newTask) => {
        // prevent adding the same tasks and empty string
        if (newTask && tasksList.includes(newTask)) {
            inputRef.current.setCustomValidity('Task already exist');
            setValidity(false);
            inputRef.current.reportValidity();
        } else {
            newTask && dispatch(addTaskToList(newTask));
            inputRef.current.value = '';
            inputRef.current.focus();
        }
    };

    const onRemoveTasksHandler = (task) => {
        dispatch(removeTaskFromList(task));
        dispatch(removeFromCheckedTasks(task));
    };


    const toggleCheckedTasksHandler = (task) => {
        checkedTasks.includes(task) ?
            dispatch(removeFromCheckedTasks(task)) :
            dispatch(addToCheckedTasks(task));
    };

    const onKeyUpHandler = (e) => {

        // validation to prevent symbols 'Space' at the beginning
        const el = inputRef.current;
        const re = /^ {1,}$/;

        if (el.value && re.test(el.value)) {
            el.setCustomValidity('Don\'t use \'Space\' at the beginning.');
            setValidity(false);
            el.reportValidity();
            el.value = '';

        // prevention wrong positive validation after navigation via Tab button
        } else if ((e.code !== "Tab") || (e.key !== "Tab") || (e.keyCode !== 9)) {

            // make the printed message able to be added to tasks  
            el.setCustomValidity('');
            setValidity(true);
        };

        // addition not empty task after Enter button pressed 
        if (el.value && ((e.code === 'Enter') || (e.key === 'Enter') || (e.keyCode === 13))) {
            onAddTasksHandler(el.value);
        };
    };

    return (
        <>
            <div className={cn(s.container)}>

                <input
                    className={cn(s.taskInputBox, s.cornerBorder)}
                    onKeyUp={onKeyUpHandler}
                    placeholder="write a new task"
                    maxLength="45"
                    minLength="1"
                    tab-index="1"
                    type="text"
                    spellCheck
                    autoFocus
                    required
                    ref={inputRef} />

                <button
                    className={cn(s.taskInputButton, s.cornerBorder, { [s.hidden]: !validity })}
                    onClick={() => onAddTasksHandler(inputRef.current.value)}>
                    Enter
                </button>

            </div>

            <div className={cn(s.container)}>

                {tasksList.map((task) => (

                    task && <div key={uuidv4()}
                        className={cn(s.containerTask, s.cornerBorder, { [s.chekedCondition]: checkedTasks.includes(task) })}>

                        <input className={cn(s.containerCheckBox)}
                            tab-index='1'
                            onClick={() => toggleCheckedTasksHandler(task)}
                            onKeyDown={(e) => {
                                if ((e.code === 'Enter') || (e.key === 'Enter') || (e.keyCode === 13)) {
                                    toggleCheckedTasksHandler(task);
                                }
                            }} />

                        <div className={cn(s.task, s.cornerBorder)}>
                            {task}
                        </div>

                        <input className={cn(s.closedButton)}
                            type='button'
                            tab-index='1'
                            value='✖'
                            onClick={() => onRemoveTasksHandler(task)} />

                    </div>

                ))}

            </div>
        </>
    );
};

export default InputField;
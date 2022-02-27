import { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    addTaskToList,
    removeTaskFromList,
    addToCheckedTasks,
    removeCheckedTasks
} from '../../toolkitRedux/toolkitSlice';

import { v4 as uuidv4 } from 'uuid';
import s from '../../styles/ToDoList.module.scss';
import cn from 'classnames';

const InputField = () => {

    const tasksList = useSelector(state => state.toolkit.tasksList);
    const checkedTasks = useSelector(state => state.toolkit.checkedTasks);

    const dispatch = useDispatch();
    const inputRef = useRef();

    const isPressedKeyCode = (e, btnName, btnCode) => (
        ((e.code === btnName) || 
         (e.key === btnName) || 
         (e.keyCode === btnCode)) ? true : false
    );
    
    const onKeyUpHandler = (e) => {
        const elem = inputRef.current;
        elem.setCustomValidity('');
        
        // validation to prevent symbols 'Space' at the beginning
        const re = /^ {1,}$/;

        if (elem.value && re.test(elem.value)) {
            elem.setCustomValidity('Don\'t use \'Space\' at the beginning.');
            elem.reportValidity();
            elem.value = '';
        };

        // addition not empty task after Enter button pressed 
        if (elem.value && (isPressedKeyCode(e, 'Enter', 13))) {
            onAddTasksHandler(elem.value, elem);
        };
    };

    const onAddTasksHandler = (newTask, elem) => {
        // prevent adding the same tasks and empty string
        if (newTask && tasksList.includes(newTask)) {
            elem.setCustomValidity('Task already exist');
            elem.reportValidity();
            elem.focus();
        } else {
            newTask && dispatch(addTaskToList(newTask));
            elem.value = '';
            elem.focus();
        }
    };

    const onRemoveTasksHandler = (task) => {
        dispatch(removeTaskFromList(task));
        dispatch(removeCheckedTasks(task));
    };

    const toggleCheckedTasksHandler = (task) => {
        checkedTasks.includes(task) ?
            dispatch(removeCheckedTasks(task)) :
            dispatch(addToCheckedTasks(task));
    };

    return (
        <>
            <div className={cn(s.container)}>

                <input
                    className={cn(s.taskInputBox, s.cornerBorder)}
                    onKeyUp={(e) => onKeyUpHandler(e)}
                    placeholder="write a new task"
                    maxLength="40"
                    minLength="1"
                    tab-index="1"
                    type="text"
                    spellCheck
                    autoFocus
                    required
                    ref={inputRef} />

                <button
                    className={cn(s.taskInputButton, s.cornerBorder)}
                    onClick={() => onAddTasksHandler(inputRef.current.value, inputRef.current)}
                >
                    Enter
                </button>

            </div>

            <div
                className={cn(s.container)}>

                {tasksList.map((task) => (

                    task && <div
                        key={uuidv4()}
                        className={cn(s.containerTask, s.cornerBorder, { [s.chekedCondition]: checkedTasks.includes(task) })}>

                        <input className={cn(s.containerCheckBox)}
                            tab-index='1'
                            onClick={() => toggleCheckedTasksHandler(task)}
                            onKeyDown={(e) => { if (isPressedKeyCode(e, 'Enter', 13)) toggleCheckedTasksHandler(task)}} 
                        />

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
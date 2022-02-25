import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from '../../styles/ToDoList.module.scss';
import cn from 'classnames';

const InputField = ({ initialTasks }) => {

    const [validity, setValidity] = useState(false);
    const [tasks, setTasks] = useState(initialTasks);
    const [checkedTasks, setCheckedTasks] = useState([]);
    const inputRef = useRef();

    const onAddTasksHandler = (newTask) => {
        if (newTask && tasks.includes(newTask)) {
            inputRef.current.setCustomValidity('Task already exist');
            setValidity(false);
            inputRef.current.reportValidity();
        } else {
            setValidity(false);
            inputRef.current.value = '';
            inputRef.current.focus();
            setTasks(prev => [newTask, ...prev]);
        }
    };

    const onRemoveTasksHandler = (task) => {
        setTasks(prev => prev.filter(el => el !== task))
    };

    const toggleCheckedTasksHandler = (task) => {
        setCheckedTasks(prev => {
            if (prev.includes(task)) {
                return prev.filter(el => el !== task);
            } else {
                return [...prev, task];
            };
        });
    };

    const onKeyUpHandler = (e) => {
        // validation to prevent symbol 'Space' at the beginning
        const el = e.target;
        const re = /^ {1,}$/;

            if (e.target.value && re.test(e.target.value)) {
                el.setCustomValidity('Don\'t use \'Space\' at the beginning.');
                setValidity(false);
                el.reportValidity();
                el.value = '';
            } else if ((e.code !== "Tab") || (e.key !== "Tab") || (e.keyCode !== 9)) {
                el.setCustomValidity('');
                setValidity(true);
            };

            if ((e.code === 'Enter') || (e.key === 'Enter') || (e.keyCode === 13)) {
                onAddTasksHandler(inputRef.current.value);
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

                    {tasks.map((task) => (
                        task && 
                        <div key={uuidv4()}
                            className={cn(s.containerTask, s.cornerBorder, { [s.chekedCondition]: checkedTasks.includes(task) })}>

                            <input className={cn(s.containerCheckBox)}
                                tab-index='1'
                                onClick={() => toggleCheckedTasksHandler(task)}
                                onKeyDown={(e) => {
                                    if ((e.code === 'Enter') || (e.key === 'Enter') || (e.keyCode === 13)) {
                                        toggleCheckedTasksHandler(task);
                                    }
                                }}/>

                            <div className={cn(s.task, s.cornerBorder)}>
                                {task}
                            </div>

                            <input className={cn(s.closedButton)}
                                type='button'
                                tab-index='1'
                                value='Close'
                                onClick={() => onRemoveTasksHandler(task)}/>

                        </div>
                    ))}

                </div>
            </>
    );
};

export default InputField;
import { useState } from 'react'
import { useTaskModal } from '@/hooks/taskModal'
import { useTasks } from '@/hooks/tasks'
import {GoKebabVertical} from 'react-icons/go'
import {FiTrash} from 'react-icons/fi'

import styles from './styles.module.scss'

interface TaskCardProps {
    checked: boolean,
    id: string,
    name: string,
    description: string,
    date: string,
}

export default function TaskCard(props: TaskCardProps) {
    const {handleOpenTaskModal} = useTaskModal()
    const {handleTaskCheck, handleDeleteTask, setLoading, setEditingTask} = useTasks()
    const [checked, setChecked] = useState(props.checked)
    
    const task = {
        id: props.id,
        checked: props.checked,
        name: props.name,
        description: props.description ?? '',
        date: props.date,
    }

    async function changeTaskCompletion() {
        checked === true ? setChecked(false) : setChecked(true)
        await handleTaskCheck(task)
        setLoading(true)
    }

    async function deleteTask(id: string) {
        setLoading(true)
        await handleDeleteTask(id)
    }
    
    async function editTask() {
        setEditingTask(task)
        handleOpenTaskModal(true)
        setLoading(true)
    }

    return (
        <div className={styles.taskCard}>
            <header>
                <label className={styles.labelAsCheckbox}>
                    <input 
                    type="checkbox"
                    checked={checked}
                    onChange={changeTaskCompletion}
                    className={styles.checkbox} />
                    <span className={styles.checkmark} />
                </label>

                <h3>{props.name}</h3>

                <button type="button" onClick={() => editTask()}>
                    <GoKebabVertical />
                </button>
            </header>

            <p>{props.description || props.name}</p>

            <footer>
                <button type="button" onClick={() => deleteTask(props.id)}> 
                    <FiTrash />
                </button>
                <span className="date">
                    {props.date}
                </span>
            </footer>
        </div>
    )
}
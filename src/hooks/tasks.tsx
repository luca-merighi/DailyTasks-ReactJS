import {ReactNode, createContext, useState, useEffect, useContext} from 'react'
import api from '@/services/api'

interface Task {
    id: string,
    checked: boolean,
    name: string,
    description: string,
    date: string
}

type CreateTask = Omit<Task, 'id' | 'checked' | 'date'>

interface TaskProviderProps {
    children: ReactNode
}

interface TasksContextData {
    tasks: Task[],
    editingTask?: Task,
    setEditingTask: (task: Task) => void,
    loading: boolean,
    setLoading: (state: boolean) => void,
    handleAddTask: (task: CreateTask) => Promise<void>,
    handleEditTask: (task: Task) => Promise<void>,
    handleTaskCheck: (task: Task) => Promise<void>,
    handleDeleteTask: (id: string) => Promise<void>
}

const TasksContext = createContext<TasksContextData>(
    {} as TasksContextData
)

export function TasksProvider(props: TaskProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [editingTask, setEditingTask] = useState<Task>()
    const [loading, setLoading] = useState(false)

    async function handleAddTask(task: CreateTask) {
        const newTask = {
            id: String(tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1),
            checked: false,
            ...task,
            date: String(new Intl.DateTimeFormat('pt-BR').format(new Date()))
        }

        await api.post('/tasks/', newTask)
        setTasks([...tasks, newTask])
        setLoading(false)
    }

    async function handleEditTask(task: Task) {
        const newTaskList = tasks.map(currentTask => {
            if(currentTask.id !== editingTask.id) {
                return currentTask
            }
            return {
                id: editingTask.id,
                checked: editingTask.checked,
                ...task
            }
        })

        await api.put('/tasks/' + editingTask.id, {
            id: editingTask.id,
            checked: editingTask.checked,
            ...task
        })
        setTasks(newTaskList)
        setEditingTask(null)
        setLoading(false)
    }

    async function handleTaskCheck(task: Task) {
        await api.put('/tasks/' + task.id, {
            ...task,
            checked: !task.checked
        })
        const tasksList = await api.get('/tasks')
        setTasks(tasksList.data)
        setLoading(false)
    }

    async function handleDeleteTask(id: string) {
        await api.delete('/tasks/' + id)
        const newTasksList = tasks.filter(task => task.id !== id)
        setTasks(newTasksList)
        setLoading(false)
    }

    useEffect(() => {
        async function loadTasks() {
            const tasksList = await api.get('/tasks')
            setTasks(tasksList.data)
        }

        loadTasks()
    }, [])

    return (
        <TasksContext.Provider value={{
            tasks,
            editingTask,
            setEditingTask,
            loading,
            setLoading,
            handleAddTask,
            handleEditTask,
            handleTaskCheck,
            handleDeleteTask
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export function useTasks() {
    const context = useContext(TasksContext)
    return context
}
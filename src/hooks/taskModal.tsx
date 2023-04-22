import {useState, createContext, ReactNode, useContext} from 'react'
import { useTasks } from './tasks'

interface TaskModalContextData {
    isTaskModalOpen: boolean,
    setTaskModalOpen: (isTaskModalOpen: boolean) => void,
    handleOpenTaskModal: (isEditing?: boolean) => void,
    handleCloseTaskModal: () => void,
    isEditing: boolean,
}

interface TaskModalProviderProps {
    children: ReactNode
}

const TaskModalContext = createContext<TaskModalContextData>(
    {} as TaskModalContextData
)

export function TaskModalProvider(props: TaskModalProviderProps) {
    const [isTaskModalOpen, setTaskModalOpen] = useState(false)
    const [isEditing, setEditing] = useState(false)

    function handleOpenTaskModal(isEditing?: boolean) {
        setTaskModalOpen(true)
        isEditing == true ? setEditing(true) : setEditing(false)
    }

    function handleCloseTaskModal() {
        setTaskModalOpen(false)
        setEditing(false)
    }

    return (
        <TaskModalContext.Provider value={{
            isTaskModalOpen,
            setTaskModalOpen,
            handleOpenTaskModal,
            handleCloseTaskModal,
            isEditing
        }}>
            {props.children}
        </TaskModalContext.Provider>
    )
}

export function useTaskModal() {
    const context = useContext(TaskModalContext)
    return context
}
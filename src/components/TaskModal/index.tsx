import {useState, useEffect} from 'react'
import Modal from 'react-modal'
import { useTaskModal } from '@/hooks/taskModal'
import { useTasks } from '@/hooks/tasks'

import {FiX, FiCheck} from 'react-icons/fi'

import styles from './styles.module.scss'

export default function TaskModal() {
    const {isTaskModalOpen, handleCloseTaskModal, isEditing} = useTaskModal()
    const {handleAddTask, handleEditTask, loading, setLoading, editingTask} = useTasks()
    const [name, setName] = useState(editingTask?.name ?? '')
    const [description, setDescription] = useState(editingTask?.name ?? '')

    useEffect(() => {
        if(isEditing === true) {
            setName(String(editingTask?.name))
            setDescription(String(editingTask?.description))
        } else {
            setName('')
            setDescription('')
        }
    }, [isEditing])

    async function addTask() {
        if(name == '') {
            return
        } else {
            setLoading(true)
            await handleAddTask({
                name,
                description,
            })

            closeTaskModal()
        }
    }

    async function editTask() {
        if(name == '') {
            return 
        } else {
            setLoading(true)
            handleEditTask({
                id: editingTask?.id,
                checked: editingTask?.checked ?? false,
                name: name || editingTask?.name,
                description: description || editingTask?.description,
                date: editingTask?.date
            })

            closeTaskModal()
        }
    }

    function closeTaskModal() {
        setName('')
        setDescription('')

        handleCloseTaskModal()
    }

    return (
        <Modal
            isOpen={isTaskModalOpen}
            onRequestClose={closeTaskModal}
            overlayClassName={styles.modalOverlay}
            className={styles.taskModal}>
            <h2>
                {isEditing === true ? 'Editar Tarefa' : 'Adicionar Tarefa'}
            </h2>

            <input 
            type="text"
            required
            maxLength={20}
            placeholder="Nome da Tarefa"
            value={name}
            onChange={e => setName(e.target.value)} />

            <textarea 
            required
            maxLength={130}
            placeholder="Descrição da Tarefa"
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>

            <div className={styles.buttons}>
                <button 
                    type="button" 
                    onClick={closeTaskModal}
                    className={styles.cancel}>
                    <FiX />
                    Cancelar
                </button>
                <button 
                    type="button" 
                    className={styles.add} 
                    onClick={isEditing === true ? editTask : addTask}>
                    <FiCheck />
                    {isEditing === true ? 'Salvar' : 'Adicionar'}
                </button>
            </div>
        </Modal>
    )
}
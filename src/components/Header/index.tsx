import { useTaskModal } from '@/hooks/taskModal'
import {FiPlus} from 'react-icons/fi'

import styles from './styles.module.scss'


export default function Header() {
    const {handleOpenTaskModal} = useTaskModal()

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <h1>
                    Daily <span>Tasks</span>
                </h1>

                <button type="button" onClick={() => handleOpenTaskModal(false)}>
                    <FiPlus />
                    <span>Criar Tarefa</span>
                </button>
            </div>
        </header>
    )
}
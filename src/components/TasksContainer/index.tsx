import { useTasks } from '@/hooks/tasks'

import TaskCard from '../TaskCard'

import styles from './styles.module.scss'

export default function TasksContainer() {
    const {tasks} = useTasks()

    return (
        <main className={styles.tasksContainer}>
            <section>
                {tasks.map(task => {
                    return (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            checked={task.checked}
                            name={task.name}
                            description={task.description}
                            date={task.date} />
                    )
                })}
            </section>
        </main>
    )
}
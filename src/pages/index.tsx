import React from 'react'
import Head from 'next/head'
import Modal from 'react-modal'

import Header from '@/components/Header'
import TasksContainer from '@/components/TasksContainer'
import TaskModal from '@/components/TaskModal'
import { TaskModalProvider } from '@/hooks/taskModal'
import { TasksProvider } from '@/hooks/tasks'

Modal.setAppElement('#__next')

export default function Home() {
  return (
    <TaskModalProvider>
      <TasksProvider>
        <Head>
          <title>Daily Tasks</title>
        </Head>

        <Header />

        <TasksContainer />

        <TaskModal />
      </TasksProvider>
    </TaskModalProvider>
  )
}
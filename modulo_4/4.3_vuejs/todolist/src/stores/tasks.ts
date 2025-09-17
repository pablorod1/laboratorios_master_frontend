import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task, TaskStatus } from '@/types/types'

export const useTasksStore = defineStore('tasksStore', () => {
  const initialTasks = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') as string)
    : []

  const allTasks = ref<Task[]>(initialTasks)
  const filter = ref<TaskStatus>('all')
  const search = ref<string>('')
  const sort = ref<string>('none')

  const tasks = computed(() => {
    let filtered = allTasks.value
    if (filter.value === 'completed') {
      filtered = filtered.filter((task) => task.completed)
    } else if (filter.value === 'pending') {
      filtered = filtered.filter((task) => !task.completed)
    }
    if (search.value.trim() !== '') {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(search.value.toLowerCase()),
      )
    }

    if (sort.value === 'asc') {
      filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sort.value === 'desc') {
      filtered = filtered.slice().sort((a, b) => b.name.localeCompare(a.name))
    }

    if (sort.value === 'pendingFirst') {
      filtered = filtered.slice().sort((a, b) => Number(a.completed) - Number(b.completed))
    }

    if (sort.value === 'completedFirst') {
      filtered = filtered.slice().sort((a, b) => Number(b.completed) - Number(a.completed))
    }
    return filtered
  })

  const addTask = (task: Task) => {
    if (task.name.trim() !== '') {
      allTasks.value.push(task)
      localStorage.setItem('tasks', JSON.stringify(allTasks.value))
    }
  }

  const removeTask = (index: number) => {
    // Remove by index in filtered list, so find the actual index in allTasks
    const filtered = tasks.value
    const taskToRemove = filtered[index]
    const actualIndex = allTasks.value.findIndex((t) => t === taskToRemove)
    if (actualIndex !== -1) {
      allTasks.value.splice(actualIndex, 1)
      localStorage.setItem('tasks', JSON.stringify(allTasks.value))
    }
  }

  const editTask = (index: number, inputValue: string) => {
    const filtered = tasks.value
    const taskToEdit = filtered[index]
    const actualIndex = allTasks.value.findIndex((t) => t === taskToEdit)
    if (actualIndex !== -1) {
      allTasks.value[actualIndex].name = inputValue
      localStorage.setItem('tasks', JSON.stringify(allTasks.value))
    }
  }

  const handleTaskCompletion = (index: number) => {
    const filtered = tasks.value
    const taskToToggle = filtered[index]
    const actualIndex = allTasks.value.findIndex((t) => t === taskToToggle)
    if (actualIndex !== -1) {
      allTasks.value[actualIndex].completed = !allTasks.value[actualIndex].completed
      localStorage.setItem('tasks', JSON.stringify(allTasks.value))
    }
  }

  const completeAllTasks = () => {
    allTasks.value = allTasks.value.map((task) => ({ ...task, completed: true }))
    localStorage.setItem('tasks', JSON.stringify(allTasks.value))
  }

  const removeCompletedTasks = () => {
    allTasks.value = allTasks.value.filter((task) => !task.completed)
    localStorage.setItem('tasks', JSON.stringify(allTasks.value))
  }

  return {
    tasks,
    addTask,
    removeTask,
    editTask,
    handleTaskCompletion,
    filter,
    search,
    sort,
    completeAllTasks,
    removeCompletedTasks,
  }
})

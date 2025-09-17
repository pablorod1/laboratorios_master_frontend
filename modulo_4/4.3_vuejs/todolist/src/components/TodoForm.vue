<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import type { Task } from '@/types/types'
import { ref } from 'vue'

const tasksStore = useTasksStore()
const addTask = () => {
  if (todoName.value.trim() === '') return

  const newTask: Task = {
    name: todoName.value,
    completed: false,
  }

  tasksStore.addTask(newTask)
  todoName.value = ''
}

const todoName = ref('')
</script>

<template>
  <form @submit.prevent="addTask">
    <div class="flex flex-col md:flex-row items-center md:items-end gap-2">
      <div class="space-y-1 w-full">
        <label for="name" class="ml-2 block text-base font-medium w-full">Nombre de la tarea</label>
        <input
          type="text"
          id="name"
          v-model="todoName"
          class="border border-gray-200 shadow-2xs rounded-4xl px-4 py-2 w-full"
          placeholder="Ejemplo: Comprar leche"
        />
      </div>
      <button
        aria-label="Añadir tarea"
        class="w-full md:w-fit cursor-pointer text-nowrap rounded-full bg-blue-600 px-4 py-2 font-medium text-white"
      >
        Añadir Tarea
      </button>
    </div>
  </form>
</template>

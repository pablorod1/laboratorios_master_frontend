<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
const isEditing = ref<boolean>(false)
const editValue = ref<string>('')
const removeTask = (index: number) => {
  tasksStore.removeTask(index)
}

const editTask = (index: number) => {
  tasksStore.editTask(index, editValue.value)
  isEditing.value = false
}

import { ref, watch } from 'vue'

const handleEditClick = () => {
  isEditing.value = true
}

// Watch for changes in tasks and update localStorage
watch(
  tasksStore.tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  },
  { deep: true },
)
</script>

<template>
  <ul class="space-y-4">
    <li
      v-for="(task, index) in tasksStore.tasks"
      :key="index"
      class="flex items-center justify-between rounded-4xl border border-gray-200 px-4 py-2"
    >
      <div class="flex items-center gap-2">
        <label class="content-input">
          <input type="checkbox" v-model="task.completed" />
          <i></i>
        </label>
        <span
          v-if="!isEditing"
          @dblclick="handleEditClick"
          :class="{ 'line-through': task.completed }"
        >
          {{ task.name }}
        </span>
        <input
          v-if="isEditing"
          @blur="editTask(index)"
          type="text"
          v-model="editValue"
          class="border border-gray-200 shadow-2xs rounded-4xl px-4 py-2"
          placeholder="Editar tarea"
        />
      </div>
      <button
        aria-label="Eliminar tarea"
        @click="removeTask(index)"
        class="cursor-pointer text-red-600 font-medium"
      >
        <span class="sm:hidden">🗑️</span>
        <span class="hidden sm:block">Eliminar</span>
      </button>
    </li>
  </ul>
</template>

<style>
.content-input input,
.content-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.content-input input {
  visibility: hidden;
  position: absolute;
  right: 0;
}

.content-input {
  position: relative;
  margin-bottom: 12px;
  padding: 4px 0 5px 40px; /* Damos un padding de 60px para posicionar 
        el elemento <i> en este espacio*/
  display: block;
}

/* Estas reglas se aplicarán a todos las elementos i 
después de cualquier input*/
.content-input input + i {
  background: #f0f0f0;
  border: 2px solid rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  top: 0;
}

/* Estas reglas se aplicarán a todos los i despues 
de un input de tipo checkbox*/
.content-input input[type='checkbox'] + i {
  width: 36px;
  height: 20px;
  border-radius: 15px;
}

.content-input input[type='checkbox'] + i:before {
  content: ''; /* No hay contenido */
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0px;
  -webkit-box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.2);
}

.content-input input[type='checkbox']:checked + i:before {
  left: 16px;
  -webkit-box-shadow: -3px 0 3px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 3px 0 -3px 0 rgba(0, 0, 0, 0.2);
}

.content-input input[type='checkbox']:checked + i {
  background: #2ac176;
}
</style>

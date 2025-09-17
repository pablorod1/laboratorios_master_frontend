<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
const tasksStore = useTasksStore()
</script>

<template>
  <div class="space-y-6 bg-gray-100 p-4 rounded-4xl">
    <div class="flex items-center gap-2">
      <div class="space-y-1 w-full">
        <label for="filter" class="block text-sm font-medium ml-2">Estado</label>
        <select
          id="filter"
          v-model="tasksStore.filter"
          class="border border-gray-200 bg-white rounded-4xl px-4 py-2 w-full"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <div class="space-y-1 w-full">
        <label for="search" class="block text-sm font-medium ml-2">Buscar</label>
        <input
          type="text"
          id="search"
          v-model="tasksStore.search"
          class="border border-gray-200 bg-white rounded-4xl px-4 py-2 w-full"
          placeholder="Buscar tarea"
        />
      </div>
      <div class="space-y-1 w-full">
        <label for="sort" class="block text-sm font-medium ml-2">Ordenar por</label>
        <select
          id="sort"
          v-model="tasksStore.sort"
          class="bg-white border border-gray-200 rounded-4xl px-4 py-2 w-full"
        >
          <option value="none">Sin ordenar</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="pendingFirst">Pendientes primero</option>
          <option value="completedFirst">Completadas primero</option>
        </select>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="cursor-pointer bg-blue-500 text-white rounded-4xl px-4 py-2 font-medium"
        @click="tasksStore.completeAllTasks"
      >
        Completar todas las tareas
      </button>
      <button
        class="cursor-pointer bg-red-500 text-white rounded-4xl px-4 py-2 font-medium"
        @click="tasksStore.removeCompletedTasks"
      >
        Eliminar tareas completadas
      </button>
    </div>
  </div>
</template>

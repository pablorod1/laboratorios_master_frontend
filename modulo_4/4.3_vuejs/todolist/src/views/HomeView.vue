<script setup lang="ts">
import TodoFilters from '@/components/TodoFilters.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <main>
    <section class="max-w-5xl mx-auto p-6">
      <div class="w-full flex items-center justify-center flex-col py-12 gap-2">
        <h1 class="text-3xl font-bold">Bienvenido a tu lista de tareas</h1>
        <p>Comienza a organizarte creando una tarea y planifica tu proyecto</p>
      </div>
      <div class="space-y-6">
        <TodoForm />

        <TodoFilters />

        <TodoList />
      </div>
    </section>
  </main>
</template>

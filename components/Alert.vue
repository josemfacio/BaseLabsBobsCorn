<template>
  <div
    v-if="mensaje"
    :class="[
      'rounded-b px-4 py-3 shadow-md flex items-start gap-3',
      tipo === 'success' ? 'bg-teal-100 border-t-4 border-teal-500 text-teal-900' :
      tipo === 'error' ? 'bg-red-100 border-t-4 border-red-500 text-red-900' : ''
    ]"
    role="alert"
  >
    <div class="py-1">
      <svg
        v-if="tipo === 'success'"
        class="fill-current h-6 w-6 text-teal-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41
           A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
        />
      </svg>
      <svg
        v-else-if="tipo === 'error'"
        class="fill-current h-6 w-6 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59c.75 1.335-.213 3.01-1.742
           3.01H3.48c-1.53 0-2.492-1.675-1.742-3.01l6.518-11.59zM11 13a1 1 0 1 0-2 0
           1 1 0 0 0 2 0zm-1-2a1 1 0 0 0 1-1V7a1 1 0 1 0-2 0v3a1 1 0 0 0 1 1z"
        />
      </svg>
    </div>
    <div>
      <p class="font-bold">{{ tipo === 'success' ? 'Compra exitosa' : 'Error en la compra' }}</p>
      <p class="text-sm">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tipo: 'success' | 'error'
  mensaje: string
}>()
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
     <button
          @click="router.back()"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
        >
          Volver
        </button>
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Todas las compras</h1>
    <div v-if="comprasStore.loading" class="text-center text-gray-500">Cargando compras...</div>
    <div v-else-if="comprasStore.error" class="text-red-500">Error: {{ comprasStore.error }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="[productoId, compras] in comprasPorProducto"
        :key="productoId"
        class="bg-white rounded-xl shadow-md p-4 flex flex-col"
      >
        <!-- Imagen base64 -->
        <img
            :src="'data:image/png;base64,' + compras[0].producto.img"
            alt="Imagen de pipoca"
            class="w-full h-40 object-cover rounded mb-4"
          />
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          {{ compras[0].producto.name }}
        </h2>
        <p class="text-sm text-gray-600 mb-4">🛒 {{ compras.length }} compras</p>
        <div class="border-t pt-2 mt-auto text-sm space-y-1 text-gray-700">
          <div
            v-for="compra in compras"
            :key="compra.id"
          >
             {{ compra.cliente.name }} – {{ formatFecha(compra.createdAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from "vue-router";
import { useComprasStore } from '~/stores/compras'
import {formatFecha} from '~/utils/formatFecha'

const comprasStore = useComprasStore()
const router = useRouter();
const comprasPorProducto = computed(() => {
  const agrupado = new Map<string, any[]>()
  for (const compra of comprasStore.compras) {
    const productoId = compra.producto.id
    if (!agrupado.has(productoId)) {
      agrupado.set(productoId, [])
    }
    agrupado.get(productoId)!.push(compra)
  }
  return agrupado
})
</script>
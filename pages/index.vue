<template>
  <div class="h-screen flex flex-col items-center justify-center text-center bg-yellow-50 p-6">
    <h1 class="text-3xl font-bold mb-4">¡Bienvenido a la tienda de Bobs Corn! 🌽</h1>
    <p class="mb-6 text-lg">¿Que quieres quieres hacer?</p>
    <div class="flex flex-col space-y-4">
        <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-2lg" @click="empezar">
            Quiero Comprar!
        </button>
         <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded text-2lg" @click="compras">
            Quiero Ver las compras!
        </button>
        
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCliente } from '~/composables/useCliente.ts'
import { useCompra } from '~/composables/useCompra.ts'
import { useClienteStore } from '~/stores/cliente.ts'
import { useComprasStore } from '~/stores/compras.ts'
import { useRouter } from 'vue-router'

const clienteStore = useClienteStore()
const comprasStore = useComprasStore()

const router = useRouter()
const { crearCliente } = useCliente()
const { getAllCompras } = useCompra()

const empezar = async () => {
  const res = await crearCliente()
  if (res.success) {
    clienteStore.setCliente(res.data)
    router.push('/productos')
  } else {
    alert('Error al crear cliente: ' + res.message)
  }
}
const compras = async () => {
  const res = await getAllCompras()
  if (res.success) {
    comprasStore.setCompras(res.data)
    router.push('/compras')
  } else {
    alert('Error al obtener compras: ' + res.message)
  }
}
</script>

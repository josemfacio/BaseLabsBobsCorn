<template>
  <div
    class="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-screen"
  >
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="mb-4">
        <button
          @click="router.back()"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
        >
          Volver
        </button>
        <div class="flex-1 flex items-center justify-center pt-96">
          <h1 class="text-3xl font-bold text-gray-800 text-center">
            ¡Hola {{ cliente?.name }}!
          </h1>
        </div>
      </div>
    </div>
    <div>
      <div v-if="loading" class="text-center text-gray-500">
        Cargando productos...
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="pipoca in pipocas.filter(p => p.activo === true)"
          :key="pipoca.id"
          class="border rounded-lg p-4 shadow hover:shadow-md transition bg-white flex flex-col justify-between"
        >
          <img
            :src="'data:image/png;base64,' + pipoca.img"
            alt="Imagen de pipoca"
            class="w-full h-80 object-cover rounded mb-4"
          />
          <h2 class="text-lg font-semibold mb-2 text-gray-800">
            {{ pipoca.name }}
          </h2>
          <button
            class="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            @click="comprar(pipoca.id)"
            :disabled="tiempoRestante > 0"
          >
            <span v-if="tiempoRestante > 0">
              Espera {{ tiempoRestante }} segundos
            </span>
            <span v-else> Comprar </span>
          </button>
        </div>
      </div>
    </div>
    <AlertaCompra
      v-if="tipoAlerta"
      :tipo="tipoAlerta"
      :mensaje="mensajeAlerta"
      class="fixed bottom-6 right-6 z-50"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useClienteStore } from "~/stores/cliente";
import { usePipocas } from "~/composables/usePipocas";
import { useCompra } from "~/composables/useCompra";
import { iniciarContador } from "~/utils/iniciarContador";
import AlertaCompra from "@/components/Alert.vue";

const clienteStore = useClienteStore();
const cliente = clienteStore.cliente;
const router = useRouter();

const { obtenerPipocas } = usePipocas();
const { comprarPipoca } = useCompra();

const pipocas = ref([]);
const loading = ref(true);
const comprando = ref(false);

const tipoAlerta = ref<"success" | "error" | null>(null);
const mensajeAlerta = ref("");
const tiempoRestante = ref(0);
let detenerContador: () => void;
const tiemposRestantes = ref<Map<string, number>>(new Map());
let temporizadores: Map<string, () => void> = new Map();

onMounted(async () => {
  if (!cliente) {
    alert("No tienes un cliente");
    router.push("/");
    return;
  }

  const res = await obtenerPipocas();
  if (res.success) {
    pipocas.value = res.data;
  } else {
    alert("Error al cargar productos");
  }
  loading.value = false;
});

const comprar = async (idPipoca: string) => {
  if (!cliente) return;

  comprando.value = true;
  const res = await comprarPipoca(cliente.id, idPipoca);
  if (res.success) {
    tipoAlerta.value = "success";
    mensajeAlerta.value = "Compra exitosa";
  } else {
    tipoAlerta.value = "error";
    mensajeAlerta.value = "Error en la compra";
    if (res.errorCode === "ALREADY_PURCHASED" && res.data?.ultimaCompra) {
      iniciarContadorDeCompra(res.data.ultimaCompra);
    }
  }

  setTimeout(() => {
    tipoAlerta.value = null;
    mensajeAlerta.value = "";
  }, 3000);
  comprando.value = false;
};
const iniciarContadorDeCompra = (ultimaCompra: string) => {
  if (detenerContador) detenerContador();

  detenerContador = iniciarContador(
    ultimaCompra,
    (segundos) => {
      tiempoRestante.value = segundos;
    },
    () => {
      tiempoRestante.value = 0;
    }
  );
};
</script>

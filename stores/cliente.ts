import { defineStore } from "pinia";
export const useClienteStore = defineStore("cliente", {
  state: () => ({
    cliente: null as null | { id: string; name: string },
  }),

  actions: {
    setCliente(data: { id: string; name: string }) {
      this.cliente = data;
      localStorage.setItem("cliente_corn_id", JSON.stringify(data));
    },

    cargarDesdeLocalStorage() {
      const raw = localStorage.getItem("cliente_corn_id");
      if (raw) {
        this.cliente = JSON.parse(raw);
      }
    },
  },
});

import { defineStore } from "pinia";

export const useComprasStore = defineStore("compras", {
  state: () => ({
    compras: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    setCompras(data: any[]) {
      this.compras = data;
    },
  },
});

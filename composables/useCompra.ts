export const useCompra = () => {
  const comprarPipoca = async (clienteId: string, pipocaId: string) => {
    const res = await fetch("/api/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clienteId: clienteId, productoId: pipocaId }),
    });
    return await res.json();
  };
  const getAllCompras = async () => {
    const res = await fetch("/api/compras");
    return await res.json();
  };
  return { comprarPipoca, getAllCompras };
};

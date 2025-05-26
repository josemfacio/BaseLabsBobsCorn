export const useCliente = () => {
  const crearCliente = async () => {
    const res = await fetch("/api/createClient", { method: "POST" });
    const data = await res.json();
    return data;
  };

  return { crearCliente };
};

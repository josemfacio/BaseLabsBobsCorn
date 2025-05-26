export const usePipocas = () => {
  const obtenerPipocas = async () => {
    const res = await fetch("/api/pipocas");
    const data = await res.json();
    return data;
  };

  return { obtenerPipocas };
};

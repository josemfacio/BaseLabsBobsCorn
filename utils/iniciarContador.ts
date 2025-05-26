export function iniciarContador(
  ultimaCompraStr: string,
  onTick: (segundos: number) => void,
  onFinish?: () => void
): () => void {
  const ultimaCompra = new Date(ultimaCompraStr).getTime();
  const ahora = Date.now();
  const expiracion = ultimaCompra + 60_000;

  let segundosRestantes = Math.max(0, Math.floor((expiracion - ahora) / 1000));
  onTick(segundosRestantes);

  const intervalo = setInterval(() => {
    segundosRestantes--;
    onTick(segundosRestantes);
    if (segundosRestantes <= 0) {
      clearInterval(intervalo);
      if (onFinish) onFinish();
    }
  }, 1000);
  return () => clearInterval(intervalo);
}

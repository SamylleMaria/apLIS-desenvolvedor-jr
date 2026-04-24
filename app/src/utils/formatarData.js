export const formatarData = (data) => {
  if (!data) return "Não informado"
  return new Date(data).toLocaleDateString("pt-BR")
};
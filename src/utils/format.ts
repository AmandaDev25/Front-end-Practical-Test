export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
export const formatPhoneInternational = (phone: string) => {
  return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{2})/, "+$1 ($2) $3-$4");
};
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

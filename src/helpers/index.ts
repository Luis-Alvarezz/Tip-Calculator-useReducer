export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', // * 'Moneda'
    currency: 'USD' // * Convertir a Dólares
  }).format(quantity)
}
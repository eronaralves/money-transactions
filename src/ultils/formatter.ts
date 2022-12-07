export const dateFormatter = new Intl.DateTimeFormat('pt-br') 

export const priceFormatter = new Intl.NumberFormat('pt-Br', {
  style: 'currency',
  currency: 'BRL'
})
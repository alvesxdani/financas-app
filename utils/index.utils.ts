export const SET_ICON = (category: string) => {
  const icons: Record<
    string,
    'work' | 'school' | 'fastfood' | 'credit-card' | 'flight'
  > = {
    salario: 'work',
    educacao: 'school',
    alimentacao: 'fastfood',
    contas: 'credit-card',
    viagem: 'flight',
  }

  return icons[category]
}

export const SET_ICON_CLASS_COLOR = (category: string) => {
  const colors: Record<string, string> = {
    salario: '!bg-purple-400',
    educacao: '!bg-indigo-400',
    alimentacao: '!bg-rose-300',
    contas: '!bg-amber-300',
    viagem: '!bg-blue-400',
  }

  return colors[category]
}

export function formatMoney(value: number) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formatter.format(value)
}

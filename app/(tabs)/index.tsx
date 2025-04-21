import { Box } from '@/components/ui/box'
import { COLORS } from '@/utils/colors.utils'
import {
  formatMoney,
  SET_ICON,
  SET_ICON_CLASS_COLOR,
} from '@/utils/index.utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const transacoes = [
    {
      data: '03/03/2025',
      descricao: 'Salário',
      valor: 3000.0,
      tipo: 'entrada',
      categoria: 'salario',
    },
    {
      data: '05/03/2025',
      descricao: 'Faculdade',
      valor: 1200.0,
      tipo: 'saida',
      icon: 'menu-book',
      categoria: 'educacao',
    },
    {
      data: '08/03/2025',
      descricao: 'Marmita',
      valor: 25.0,
      tipo: 'saida',
      categoria: 'alimentacao',
    },
    {
      data: '12/03/2025',
      descricao: 'Prestação Paris',
      valor: 500.0,
      tipo: 'saida',
      categoria: 'viagem',
    },
    {
      data: '15/03/2025',
      descricao: 'Conta de Luz',
      valor: 310.0,
      tipo: 'saida',
      categoria: 'contas',
    },
    {
      data: '18/03/2025',
      descricao: 'Sanduíche',
      valor: 52.0,
      tipo: 'saida',
      categoria: 'alimentacao',
    },
  ]

  return (
    <SafeAreaView className="px-2">
      <FlatList
        data={transacoes}
        renderItem={({ item }) => (
          <Box className="flex-row items-center justify-between gap-2 px-2 py-3 mb-2 border-b border-b-gray-200">
            <MaterialIcons
              name={SET_ICON(item.categoria)}
              size={36}
              color={COLORS.white}
              className={`${SET_ICON_CLASS_COLOR(
                item.categoria,
              )} p-2 rounded-full`}
            />
            <Box className="grid gap-1 flex-1">
              <Text className="text-2xs text-neutral-400">{item.data}</Text>
              <Text className="font-semibold">{item.descricao}</Text>
            </Box>
            <Text>{formatMoney(item.valor)}</Text>
          </Box>
        )}
      />
    </SafeAreaView>
  )
}

export default Home

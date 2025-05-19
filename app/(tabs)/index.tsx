import { Box } from '@/components/ui/box'
import { TransactionsContext } from '@/contexts/transactions.context'
import { COLORS } from '@/utils/colors.utils'
import { formatMoney } from '@/utils/index.utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useContext } from 'react'
import { FlatList, Text, View } from 'react-native'

const Home = () => {
  const [transactions] = useContext(TransactionsContext)

  const SET_ICON = (
    category: string,
  ): {
    color: string
    icon:
      | 'attach-money'
      | 'school'
      | 'fastfood'
      | 'credit-card'
      | 'flight'
      | 'help'
      | 'local-hospital'
    transactionColor?: string
  } => {
    switch (category) {
      case 'renda':
        return {
          color: 'bg-purple-400',
          icon: 'attach-money',
          transactionColor: 'text-green-500',
        }
      case 'educacao':
        return {
          color: 'bg-indigo-400',
          icon: 'school',
          transactionColor: 'text-red-500',
        }
      case 'alimentacao':
        return {
          color: 'bg-rose-300',
          icon: 'fastfood',
          transactionColor: 'text-red-500',
        }
      case 'contas':
        return {
          color: 'bg-amber-300',
          icon: 'credit-card',
          transactionColor: 'text-red-500',
        }
      case 'viagem':
        return {
          color: 'bg-blue-400',
          icon: 'flight',
          transactionColor: 'text-red-500',
        }
      case 'saude':
        return {
          color: 'bg-green-400',
          icon: 'local-hospital',
          transactionColor: 'text-red-500',
        }
      default:
        return {
          color: 'bg-gray-400',
          icon: 'help',
        }
    }
  }

  return (
    <View className="px-2">
      {!transactions.length && (
        <Text className="text-center text-neutral-400 py-4">
          Nenhuma transação encontrada.
        </Text>
      )}
      {transactions.length > 0 && (
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <Box className="flex-row items-center justify-between gap-2 px-2 py-3 mb-2 border-b border-b-gray-200">
              <MaterialIcons
                name={SET_ICON(item.category).icon}
                size={36}
                color={COLORS.white}
                className={`${SET_ICON(item.category).color} p-2 rounded-full`}
              />
              <Box className="grid gap-1 flex-1">
                <Text className="text-2xs text-neutral-400">
                  {new Date(item.date).toLocaleDateString('pt-BR')}
                </Text>
                <Text className="font-semibold">{item.title}</Text>
              </Box>
              <Text className={SET_ICON(item.category).transactionColor}>
                {formatMoney(item.value as number)}
              </Text>
            </Box>
          )}
        />
      )}
    </View>
  )
}

export default Home

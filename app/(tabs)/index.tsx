import { Box } from '@/components/ui/box'
import { COLORS } from '@/utils/colors.utils'
import { formatMoney } from '@/utils/index.utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type TransacaoT = {
  title: string
  value: number | null
  date: string
  category: string
}

const Home = () => {
  const [transacoes, setTransacoes] = useState<TransacaoT[]>([])

  useEffect(() => {
    async function loadTransacoes() {
      // AsyncStorage.clear()
      const data = await AsyncStorage.getItem('data')
      if (data) {
        setTransacoes(JSON.parse(data))
      }
      console.log('Transações:', data)
      console.log('Quantidade:', data?.length)
    }

    loadTransacoes()
  }, [])

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
    transitionColor?: string
  } => {
    switch (category) {
      case 'renda':
        return {
          color: 'bg-purple-400',
          icon: 'attach-money',
          transitionColor: 'text-green-500',
        }
      case 'educacao':
        return {
          color: 'bg-indigo-400',
          icon: 'school',
          transitionColor: 'text-red-500',
        }
      case 'alimentacao':
        return {
          color: 'bg-rose-300',
          icon: 'fastfood',
          transitionColor: 'text-red-500',
        }
      case 'contas':
        return {
          color: 'bg-amber-300',
          icon: 'credit-card',
          transitionColor: 'text-red-500',
        }
      case 'viagem':
        return {
          color: 'bg-blue-400',
          icon: 'flight',
          transitionColor: 'text-red-500',
        }
      case 'saude':
        return {
          color: 'bg-green-400',
          icon: 'local-hospital',
          transitionColor: 'text-red-500',
        }
      default:
        return {
          color: 'bg-gray-400',
          icon: 'help',
        }
    }
  }

  return (
    <SafeAreaView className="px-2">
      {!transacoes.length && (
        <Text className="text-center text-neutral-400">
          Nenhuma transação encontrada
        </Text>
      )}
      {transacoes.length > 0 && (
        <FlatList
          data={transacoes}
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
              <Text className={SET_ICON(item.category).transitionColor}>
                {formatMoney(item.value as number)}
              </Text>
            </Box>
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Home

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

type TransactionT = {
  title: string
  value: number | null
  date: string
  category: string
}

export const TransactionsContext = createContext<Array<any>>([])

export default function TransactionsContextProvider({ children }: any) {
  const [transactions, setTransactions] = useState<TransactionT[]>([])

  useEffect(() => {
    async function loadTransactions() {
      // AsyncStorage.clear()
      const data = await AsyncStorage.getItem('data')
      if (data) {
        setTransactions(JSON.parse(data))
      }
    }

    loadTransactions()
  }, [transactions])

  return (
    <TransactionsContext.Provider value={[transactions, setTransactions]}>
      {children}
    </TransactionsContext.Provider>
  )
}

import { COLORS } from '@/utils/colors.utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Tabs } from 'expo-router'
import { View } from 'react-native'

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.main,
        headerStyle: {
          backgroundColor: COLORS.main,
        },
        headerTintColor: COLORS.white,
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: COLORS.inactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={24} color={color} />
          ),
          tabBarLabel: 'Transações',
          headerTitle: 'Transações',
        }}
      />
      <Tabs.Screen
        name="cadastro"
        options={{
          tabBarIcon: ({ color }) => (
            <View className="flex items-center justify-center !w-16 !h-16 rounded-full bg-main">
              <MaterialIcons name="add" size={28} color={COLORS.white} />
            </View>
          ),
          tabBarLabelStyle: { display: 'none' },
          headerTitle: 'Adicionar transação',
        }}
      />
      <Tabs.Screen
        name="resumo"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pie-chart" size={24} color={color} />
          ),
          tabBarLabel: 'Resumo',
          headerTitle: 'Resumo',
        }}
      />
    </Tabs>
  )
}

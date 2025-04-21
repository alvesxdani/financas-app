import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} className="text-red-500">
      <Text className="text-red-500">Teste</Text>
    </SafeAreaView>
  )
}

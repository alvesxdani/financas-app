import { Link } from 'expo-router'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotFoundScreen() {
  return (
    <>
      <SafeAreaView className="flex-1 items-center justify-center p-5">
        <Text className="font-semibold text-2xl text-center">Ops!</Text>
        <Text>Essa página não existe.</Text>
        <Text>
          <Link href={'/'}>Voltar para Home</Link>
        </Text>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})

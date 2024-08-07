import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('save-to', value)
    } catch (e) {
      // saving error
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View>
        <Text style={styles.label}>Save to:</Text>
        <TextInput style={styles.input} onChangeText={storeData} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 8,
  },
})

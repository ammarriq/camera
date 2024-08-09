import { storage } from '@/storage'
import { StatusBar } from 'expo-status-bar'
import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'

export default function Settings() {
  return (
    <>
      <SafeAreaView style={tw`h-full px-4 py-2`}>
        <Text style={tw`font-semibold text-2xl`}>Settings</Text>

        <View style={tw`size-full mt-4`}>
          <Text style={tw`font-medium text-base`}>Save to:</Text>
          <TextInput
            style={tw`px-4 py-1.4 rounded-md border mt-2`}
            onChangeText={(e) => storage.set('saveLocation', e)}
            defaultValue={storage.getString('saveLocation') ?? 'First Place'}
          />
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor='black' style='light' />
    </>
  )
}

import { ArrowLeftIcon } from '@/icons'
import { storage } from '@/storage'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'

export default function Settings() {
  return (
    <>
      <SafeAreaView style={tw`h-full px-6 py-2 bg-black`}>
        <View style={tw`flex-row items-center gap-6`}>
          <Link href='/camera' style={tw`w-6`}>
            <ArrowLeftIcon style={tw`size-6 text-white`} strokeWidth={2} />
          </Link>
          <Text style={tw`text-lg text-white`}>Settings</Text>
        </View>

        <View style={tw`size-full mt-8`}>
          <Text style={tw`text-sm text-white`}>Location:</Text>
          <TextInput
            style={tw`px-4 py-1.4 rounded-md border mt-2 border-white text-white`}
            onChangeText={(e) => storage.set('saveLocation', e)}
            defaultValue={storage.getString('saveLocation') ?? 'First Place'}
          />
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor='black' style='light' />
    </>
  )
}

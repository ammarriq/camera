import { Redirect, SplashScreen } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Linking,
  PermissionsAndroid,
  Pressable,
  Text,
  View,
} from 'react-native'
import { useCameraPermission } from 'react-native-vision-camera'
import tw from 'twrnc'

SplashScreen.preventAutoHideAsync()

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const { check, request, PERMISSIONS } = PermissionsAndroid

  const [hasMediaPermission, setHasMediaPermission] = useState(false)

  useEffect(() => {
    if (!hasPermission) requestPermission()
  }, [])

  useEffect(() => {
    async function getCameraPermissions() {
      const hasMediaPermission = await check(PERMISSIONS.READ_MEDIA_IMAGES)
      if (!hasMediaPermission) await request(PERMISSIONS.READ_MEDIA_IMAGES)

      setHasMediaPermission(hasMediaPermission)
      SplashScreen.hideAsync()
    }

    getCameraPermissions()
  }, [])

  if (hasPermission && hasMediaPermission) return <Redirect href='/camera' />

  return (
    <View style={tw`grow items-center justify-center`}>
      <Text> No Permissions:</Text>
      {!hasPermission ? <Text> Camera</Text> : null}
      {!hasMediaPermission ? <Text> Media</Text> : null}

      <Pressable onPress={() => Linking.openSettings()}>
        <Text> Open settings</Text>
      </Pressable>
    </View>
  )
}

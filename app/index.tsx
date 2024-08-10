import { Redirect, SplashScreen } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Linking,
  PermissionsAndroid,
  Pressable,
  Text,
  View,
} from 'react-native'
import tw from 'twrnc'

SplashScreen.preventAutoHideAsync()

export default function Index() {
  const { check, request, PERMISSIONS } = PermissionsAndroid

  const [hasPermissions, setHasPermissions] = useState({
    camera: false,
    media: false,
  })

  useEffect(() => {
    async function getCameraPermissions() {
      const hasCameraPermission = check(PERMISSIONS.CAMERA)
      const hasMediaPermission = check(PERMISSIONS.READ_MEDIA_IMAGES)

      const [camera, media] = await Promise.all([
        hasCameraPermission,
        hasMediaPermission,
      ])

      SplashScreen.hideAsync()
      if (camera && media) setHasPermissions((prev) => ({ media, camera }))

      const getCamera = camera ? true : request(PERMISSIONS.CAMERA)
      const getMedia = media ? true : request(PERMISSIONS.READ_MEDIA_IMAGES)

      await Promise.all([getCamera, getMedia])
    }

    getCameraPermissions()
  }, [])

  if (hasPermissions.camera && hasPermissions.media) {
    return <Redirect href='/camera' />
  }

  return (
    <View style={tw`grow items-center justify-center`}>
      <Text> No Permissions:</Text>
      {!hasPermissions.camera ? <Text> Camera</Text> : null}
      {!hasPermissions.media ? <Text> Media</Text> : null}

      <Pressable onPress={() => Linking.openSettings()}>
        <Text> Open settings</Text>
      </Pressable>
    </View>
  )
}

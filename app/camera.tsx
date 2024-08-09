import icons from '@/constants/icons'
import { useAppState } from '@/hooks'
import { storage } from '@/storage'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { Link, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useRef } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Camera as CameraDevice,
  getCameraFormat,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera'
import tw from 'twrnc'

export default function Camera() {
  const camera = useRef<CameraDevice>(null)
  const { hasPermission } = useCameraPermission()

  const device = useCameraDevice('front')
  const format = getCameraFormat(device!, [])

  const appState = useAppState()

  const takePhoto = async () => {
    const file = await camera.current?.takePhoto()

    CameraRoll.saveAsset(`file://${file?.path}`, {
      type: 'photo',
      album: storage.getString('saveLocation') ?? 'First Place',
    })
  }

  if (!device || !hasPermission) return <Redirect href='/' />

  return (
    <>
      <SafeAreaView style={tw`h-full`}>
        <CameraDevice
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          format={format}
          isActive={appState === 'active'}
          photoQualityBalance='quality'
          enableZoomGesture
          photo
        />

        <View style={tw`bg-black/50 justify-end h-14 w-full px-6 pb-3`}>
          <Link style={tw`items-center justify-center h-8`} href='/settings'>
            <Image
              source={icons.settings}
              style={tw`size-6`}
              resizeMode='center'
            />
          </Link>
        </View>

        <View style={tw`grow justify-end`}>
          <View style={tw`justify-center items-center bg-black/50 h-40`}>
            <Pressable onPress={takePhoto}>
              {({ pressed }) => (
                <View
                  style={tw`border-[6px] border-white rounded-full
                ${pressed ? 'size-14' : 'size-16'}`}
                />
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <StatusBar backgroundColor='rgba(0, 0, 0, 0.5)' style='light' />
    </>
  )
}

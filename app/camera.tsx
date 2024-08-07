import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { Link, Redirect } from 'expo-router'
import { useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Camera as CameraDevice,
  getCameraFormat,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera'

export default function Camera() {
  const camera = useRef<CameraDevice>(null)
  const { hasPermission } = useCameraPermission()

  const device = useCameraDevice('back')
  const format = getCameraFormat(device!, [])

  if (!device || !hasPermission) return <Redirect href='/' />

  console.log(format)

  return (
    // <View style={styles.relative}>
    <>
      <CameraDevice
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        format={format}
        photoQualityBalance='quality'
        enableZoomGesture
        isActive
        photo
      />

      <Link style={styles.settings} href='/settings'></Link>

      <View style={styles.center}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const file = await camera.current?.takePhoto()
            await CameraRoll.saveAsset(`file://${file?.path}`, {
              type: 'photo',
              album: 'First Place',
            })
          }}
        />
      </View>
    </>
    // </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'red',
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settings: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'red',
    marginTop: 40,
    marginLeft: 40,
  },
})

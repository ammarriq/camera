import { useAppState } from "@/hooks"
import { ChangeIcon, ImageIcon, SettingsIcon } from "@/icons"
import { storage } from "@/storage"
import { CameraRoll } from "@react-native-camera-roll/camera-roll"
import { useIsFocused } from "@react-navigation/native"
import { Link, Redirect } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Camera as CameraDevice,
  getCameraFormat,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera"
import tw from "twrnc"

export default function Camera() {
  const camera = useRef<CameraDevice>(null)
  const { hasPermission } = useCameraPermission()
  const [isCapturing, setIsCapturing] = useState(false)

  const [isBackCamera, setIsBackCamera] = useState(true)
  const device = useCameraDevice(isBackCamera ? "back" : "front")
  const format = getCameraFormat(device!, [])

  const isFocused = useIsFocused()
  const appState = useAppState()
  const isActive = isFocused && appState === "active"

  const takePhoto = async () => {
    if (isCapturing) return

    try {
      setIsCapturing(true)

      const file = await camera.current?.takePhoto({ enableShutterSound: true })
      await CameraRoll.saveAsset(`file://${file?.path}`, {
        type: "photo",
        album: storage.getString("saveLocation") ?? "First Place",
      })

      setIsCapturing(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (!device || !hasPermission) return <Redirect href="/" />

  return (
    <>
      <SafeAreaView style={tw`h-full`}>
        <CameraDevice
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          format={format}
          isActive={isActive}
          photoQualityBalance={"speed"}
          enableZoomGesture
          photo
        />

        <View style={tw`bg-black/50 justify-end h-14 w-full px-8 pb-3`}>
          <Link href="/settings" style={tw`w-6`}>
            <SettingsIcon style={tw`text-white size-6`} strokeWidth={1.25} />
          </Link>
        </View>

        <View
          style={tw`mt-auto justify-between flex-row items-center bg-black/50 h-40 px-8`}
        >
          <Link href="/media">
            <ImageIcon style={tw`text-white size-7`} strokeWidth={1.25} />
          </Link>

          <Pressable onPress={takePhoto}>
            {({ pressed }) => (
              <View
                style={tw`border-[6px] border-white rounded-full
                ${pressed && !isCapturing ? "size-16" : "size-[4.5rem]"}`}
              />
            )}
          </Pressable>

          <Pressable onPress={() => setIsBackCamera((prev) => !prev)}>
            <ChangeIcon style={tw`text-white size-7`} strokeWidth={1.25} />
          </Pressable>
        </View>
      </SafeAreaView>

      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" style="light" />
    </>
  )
}
// export default function Camera() {
//   const camera = useRef<CameraDevice>(null)
//   const { hasPermission } = useCameraPermission()
//   const [isCapturing, setIsCapturing] = useState(false)

//   const device = useCameraDevice('front')
//   const format = getCameraFormat(device!, [])

//   const isFocused = useIsFocused()
//   const appState = useAppState()
//   const isActive = isFocused && appState === 'active'

//   const takePhoto = async () => {
//     if (isCapturing) return

//     try {
//       setIsCapturing(true)

//       const file = await camera.current?.takePhoto({ enableShutterSound: true })
//       await CameraRoll.saveAsset(`file://${file?.path}`, {
//         type: 'photo',
//         album: storage.getString('saveLocation') ?? 'First Place',
//       })

//       setIsCapturing(false)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   if (!device || !hasPermission) return <Redirect href='/' />

//   return (
//     <>
//       <SafeAreaView style={tw`h-full`}>
//         <CameraDevice
//           ref={camera}
//           style={StyleSheet.absoluteFill}
//           device={device}
//           format={format}
//           isActive={isActive}
//           photoQualityBalance='speed'
//           enableZoomGesture
//           photo
//         />

//         <View style={tw`bg-black/50 justify-end h-14 w-full px-6 pb-3`}>
//           <Link href='/settings' style={tw`w-6`}>
//             <SettingsIcon style={tw`text-white size-6`} strokeWidth={1.25} />
//           </Link>
//         </View>

//         <View
//           style={tw`mt-auto justify-between flex-row items-center bg-black/50 h-40 px-6`}
//         >
//           <Pressable onPress={takePhoto}>
//             <ImageIcon style={tw`text-white size-7`} strokeWidth={1.25} />
//           </Pressable>

//           <Pressable onPress={takePhoto}>
//             {({ pressed }) => (
//               <View
//                 style={tw`border-[6px] border-white rounded-full
//                 ${pressed && !isCapturing ? 'size-14' : 'size-16'}`}
//               />
//             )}
//           </Pressable>

//           <Pressable onPress={() => {}}>
//             <ChangeIcon style={tw`text-white size-7`} strokeWidth={1.25} />
//           </Pressable>
//         </View>
//       </SafeAreaView>

//       <StatusBar backgroundColor='rgba(0, 0, 0, 0.5)' style='light' />
//     </>
//   )
// }

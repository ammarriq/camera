import { CameraRoll } from "@react-native-camera-roll/camera-roll"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { FlatList, Image, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc"

export default function Media() {
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    async function getPhotos() {
      const photos = await CameraRoll.getPhotos({
        first: 20,
        groupTypes: "SavedPhotos",
      })

      setPhotos(photos.edges.map((o) => o.node.image.uri))
    }

    getPhotos()
  }, [])

  return (
    <>
      <SafeAreaView style={tw`h-full mx-auto`}>
        <FlatList
          data={photos}
          renderItem={Item}
          numColumns={2}
          keyExtractor={(item) => item}
          style={tw`pl-2 pt-2`}
        />
      </SafeAreaView>
      <StatusBar backgroundColor="black" style="light" />
    </>
  )
}

const Item = ({ item }: { item: string }) => {
  return (
    <View style={tw`max-w-[50%] pr-2 pb-2`}>
      <Image style={tw`w-full aspect-square bg-green-500`} src={item} />
    </View>
  )
}

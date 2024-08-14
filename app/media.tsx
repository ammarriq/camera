import {
  CameraRoll,
  PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll"
import { useEffect, useState } from "react"
import { Image, View } from "react-native"
import PagerView from "react-native-pager-view"
import tw from "twrnc"

export default function Media() {
  const [photos, setPhotos] = useState<PhotoIdentifier["node"][]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [endCursor, setEndCursor] = useState<string>()

  const getPhotos = async () => {
    if (!hasNextPage || isLoading) return

    setIsLoading(true)

    const data = await CameraRoll.getPhotos({
      first: 10,
      after: endCursor,
      groupTypes: "SavedPhotos",
    })

    setPhotos((prev) => [...prev, ...data.edges.map(({ node }) => node)])
    setHasNextPage(data.page_info.has_next_page)

    setIsLoading(false)
    setEndCursor(data.page_info.end_cursor)
  }

  useEffect(() => {
    getPhotos()
  }, [])

  return (
    <View style={tw`grow`}>
      <PagerView
        style={tw`grow`}
        initialPage={0}
        onPageSelected={(e) => {
          const newPage = e.nativeEvent.position
          if (newPage === photos.length - 3) getPhotos()
        }}
      >
        {photos.map(({ id, image }) => (
          <Image key={id} source={image} />
        ))}
      </PagerView>
    </View>
  )
}

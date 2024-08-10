import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { Text, View } from 'react-native'

export default function Media() {
  const photos = CameraRoll.getPhotos({
    first: 20,
    assetType: 'Photos',
  }).then((photos) => console.log({ photos }))

  return (
    <View>
      <Text>media</Text>
    </View>
  )
}

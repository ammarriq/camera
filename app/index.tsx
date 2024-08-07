import { Redirect } from 'expo-router'
import { useEffect } from 'react'
import { Linking, StyleSheet, Text } from 'react-native'
import { useCameraPermission } from 'react-native-vision-camera'

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    async function getPermissions() {
      const result = await requestPermission()
      if (!result) Linking.openSettings()
    }

    getPermissions()
  }, [])

  if (hasPermission) return <Redirect href='/camera' />
  return <Text style={styles.center}>No Permissions</Text>
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

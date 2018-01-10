import { Permissions, Notifications } from 'expo'
import { AsyncStorage } from 'react-native'

export default async () => {
  let token = await AsyncStorage.getItem('PushToken')
  if (token) {
    return
  }

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return
  }

  token = await Notifications.getExpoPushTokenAsync()
  await AsyncStorage.setItem('PushToken', token)
}

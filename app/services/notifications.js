import { Permissions, Notifications } from 'expo'
import { AsyncStorage } from 'react-native'

export default async () => {
  const previousToken = await AsyncStorage.getItem('PushToken')
  console.log('getItem: ', previousToken)
  if (previousToken) {
    return
  }

  const { status: existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS)
  let finalStatus = existingStatus
  console.log('finalStatus: ', finalStatus)
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

  const token = await Notifications.getExpoPushTokenAsync()
  console.log('getExponentPushTokenAsync: ', token)
  await AsyncStorage.setItem('PushToken', token)
}

import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

export async function scheduleNotification() {
  const notificationId = await AsyncStorage.getItem('notification-id')

  if (notificationId === null) {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    if (permission.status = 'granted') {
      await Notifications.cancelAllScheduledNotificationsAsync()

      const time = new Date()
      time.setSeconds(time.getSeconds() + 10)
      // the notification will show in 10 seconds
      // you need to minimize the app, otherwise it doesn't trigger the notification

      const notificationId = await Notifications.scheduleLocalNotificationAsync({
        'title': 'FlashCards',
        'body': 'You need to study everyday!'
      }, {
        time,
        repeat: 'day'
      })

      AsyncStorage.setItem('notification-id', notificationId)
    }
  }
}

export async function clearNotification() {
  await AsyncStorage.removeItem('notification-id')
  await Notifications.cancelAllScheduledNotificationsAsync()
}
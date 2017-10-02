import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

export async function scheduleNotification() {
  const notificationId = await AsyncStorage.getItem('notification-id')

  if (notificationId === null) {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    if (permission.status = 'granted') {
      await Notifications.cancelAllScheduledNotificationsAsync()

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(20)
      tomorrow.setMinutes(0)

      const notificationId = await Notifications.scheduleLocalNotificationAsync({
        'title': 'FlashCards',
        'body': 'You need to study everyday!'
      }, {
        time: tomorrow,
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
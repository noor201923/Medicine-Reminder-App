import * as Notifications from 'expo-notifications';

export async function scheduleNotification(title, body, dateTime) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: dateTime, // now a Date object
  });
}

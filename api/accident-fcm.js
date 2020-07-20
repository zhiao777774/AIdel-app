import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default class FCM {
    expoPushToken;
    notification;

    enable() {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        registerForPushNotificationsAsync().then(token => this.expoPushToken = token);
        Notifications.addNotificationReceivedListener(notifi => this.notification = notifi);
        Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        mongoDB.watch({
            collection: 'historicalAccident'
        }, (data) => {
            if (data && data.operationType && data.operationType === 'insert') {
                const { date, type, location } = data.fullDocument;
                this._fcm({
                    title: '緊急!',
                    body: `${date}: 於${location.address}疑似發生${type}事故`,
                    vibrate: true
                });
            }
        });
    }

    destroy() {
        Notifications.removeAllNotificationListeners();
    }

    async _fcm(message) {
        await sendPushNotification(this.expoPushToken, message);
    }
}

async function sendPushNotification(expoPushToken, message) {
    message.to = message.to || expoPushToken;
    message.sound = message.sound || 'default';
    message.title = message.title || ' ';
    message.body = message.body || ' ';

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
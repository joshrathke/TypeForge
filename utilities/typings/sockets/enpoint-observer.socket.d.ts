export interface EndpointPushNotificationBody {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string
}
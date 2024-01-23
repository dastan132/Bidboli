import baseApiUrl from './baseUrl'

const GET_NOTIFICATION_LIST = baseApiUrl.BASE_URL + '/api/v1/notification/notificationList?'
const GET_NOTIFICATION_COUNT = baseApiUrl.BASE_URL + '/api/v1/notification/notificationCount'
export default {
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_COUNT
}

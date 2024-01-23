import baseApiUrl from './baseUrl'

const GET_USER_DETAILS = baseApiUrl.BASE_URL + '/api/v1/user/getUserDetails/26'
const UPDATE_PROFILE_API = baseApiUrl.BASE_URL + '/api/v1/user/updateProfileData'
const PROFILE_API = baseApiUrl.BASE_URL + '/api/v1/user/updateProfileData'
const COUNRTY_API = baseApiUrl.BASE_URL + '/api/v1/eventMaster/getCountries'
const CHANGE_PASSWORD = baseApiUrl.BASE_URL + '/api/v1/user/changePassword'
const UPDATE_PASSWORD = baseApiUrl.BASE_URL + '/api/v1/user/updatePassword'

export default {
  GET_USER_DETAILS,
  UPDATE_PROFILE_API,
  PROFILE_API,
  COUNRTY_API,
  CHANGE_PASSWORD,
  UPDATE_PASSWORD
}

import baseApiUrl from './baseUrl'

const ADD_TO_PRIVATE_WATCHLIST = baseApiUrl.BASE_URL + '/api/v1/event/addToWatchlist'

const REMOVE_FROM_PRIVATE_WATCHLIST = baseApiUrl.BASE_URL + '/api/v1/event/removeFromWatchlist'

const CREATE_EVENT = baseApiUrl.BASE_URL + '/api/v1/event/createEvent'

const GET_ASSET_TYPES = baseApiUrl.BASE_URL + '/api/v1/eventMaster/getAssetTypes'

const GET_ASSET_CLASSIFICATIONS =
  baseApiUrl.BASE_URL + '/api/v1/eventMaster/getAssetClassifications'

const GET_CITIES = baseApiUrl.BASE_URL + '/api/v1/eventMaster/getCities'

const GET_EVENT_AVATARS = baseApiUrl.BASE_URL + '/api/v1/event/getAssetIcons'

const GET_EVENT_CLASSIFICATIONS = baseApiUrl.BASE_URL + '/api/v1/eventMaster/getAssetSellingTypes'

const GET_EVENT_DETAILS = baseApiUrl.BASE_URL + '/api/v1/event/eventDetail/'

const GET_EVENT_TYPES_WITH_COUNT = baseApiUrl.BASE_URL + '/api/v1/event/assetsEventCount/'

const GET_EVENTS = baseApiUrl.BASE_URL + '/api/v1/event/list'

const GET_IMAGE_URL = baseApiUrl.BASE_URL + '/api/v1/event/getImageUrl'

const REMOVE_IMAGE = baseApiUrl.BASE_URL + '/api/v1/event/removeImage'

const GET_INTERESTED_EVENTS = baseApiUrl.BASE_URL + '/api/v1/event/eventInterest/list/'

const GET_WATCHLIST_EVENTS = baseApiUrl.BASE_URL + '/api/v1/event/watchlist/list'

const ADD_TO_INTERESTED_EVENTS = baseApiUrl.BASE_URL + '/api/v1/event/addToEventInterest/'

const GET_SIMILAR_EVENTS = baseApiUrl.BASE_URL + '/api/v1/event/similerEventList/'

const REMOVE_INTERESTED_EVENTS = baseApiUrl.BASE_URL + '/api/v1/event/removeFromEventInterest/'

// const GET_EVENT_LIST_FOR_SELLER = baseApiUrl.BASE_URL + '/api/v1/event/listForSeller/'

const GET_EVENTS_LIST_FOR_USER = baseApiUrl.BASE_URL + '/api/v1/event/listForUser/?'

export default {
  ADD_TO_INTERESTED_EVENTS,
  ADD_TO_PRIVATE_WATCHLIST,
  REMOVE_FROM_PRIVATE_WATCHLIST,
  CREATE_EVENT,
  GET_ASSET_TYPES,
  GET_ASSET_CLASSIFICATIONS,
  GET_CITIES,
  GET_EVENT_CLASSIFICATIONS,
  GET_EVENT_DETAILS,
  GET_EVENT_TYPES_WITH_COUNT,
  GET_EVENT_AVATARS,
  GET_EVENTS,
  GET_IMAGE_URL,
  GET_INTERESTED_EVENTS,
  GET_SIMILAR_EVENTS,
  REMOVE_INTERESTED_EVENTS,
  REMOVE_IMAGE,
  // GET_EVENT_LIST_FOR_SELLER,
  GET_WATCHLIST_EVENTS,
  GET_EVENTS_LIST_FOR_USER
}

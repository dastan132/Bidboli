import baseApiUrl from './baseUrl'

const ADD_PRVATE_WATCHLIST = baseApiUrl.BASE_URL + '/api/v1/home/addToFavorite'

const GET_POPULAR_EVENTS = baseApiUrl.BASE_URL + '/api/v1/home/getPopularAssetTypes'

const POPULAR_EVENTS = baseApiUrl.BASE_URL + '/api/v1/home/popularEvents?limit=8'

const SUBSCRIBE_TO_NEWSLETTER = baseApiUrl.BASE_URL + '/api/v1/home/newsletterSignUp'

const GET_LATEST_BLOGS = baseApiUrl.BASE_URL + '/api/v1/home/latestBlogs'

export default {
  ADD_PRVATE_WATCHLIST,
  GET_LATEST_BLOGS,
  GET_POPULAR_EVENTS,
  POPULAR_EVENTS,
  SUBSCRIBE_TO_NEWSLETTER
}

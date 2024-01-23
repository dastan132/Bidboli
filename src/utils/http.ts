export default function getBaseUrl() {
  let url
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'https://92id6yw9sb.execute-api.us-east-1.amazonaws.com/uat'
      break
    case 'development':
    default:
      url = 'http://localhost:8000'
  }

  return url
}

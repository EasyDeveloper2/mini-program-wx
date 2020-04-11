
let devUrl = "https://k2c-1.ikunchi.com"
let qaUrl = "https://k2c-3.ikunchi.com"
let prod = "https://k2c-prod.ikunchi.com"

module.exports = {
  baseUrl: qaUrl,
  version:"1.14.0",
  apiVersion:4,
  envVersion: "release", //develop trial release
  environment: "development", //production development
  subChannelNo: "KM0001",
  sentryUrl:"https://kmhwx-sentry.ikunchi.com/kmh-wx"
}
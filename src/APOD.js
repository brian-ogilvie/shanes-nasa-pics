import axios from 'axios'
import apiKeys from './util/config'
import Helper from './util/Helper'

const API_KEY = apiKeys.nasa

const APOD = {
  async getData(daysBack) {
    const oneDay = 1000*60*60*24
    const today = new Date()
    const date = new Date(today - (daysBack * oneDay))
    const dateParam = Helper.formatDate(date)
    const url = `https://api.nasa.gov/planetary/apod?date=${dateParam}&api_key=${API_KEY}`
    const resp = await axios(url)
    return resp.data
  },
}

export default APOD
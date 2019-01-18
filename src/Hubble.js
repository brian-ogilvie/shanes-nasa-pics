import axios from 'axios'

const BASE_URL = 'http://hubblesite.org/api/v3/'
const NEWS_URL = BASE_URL + 'news/'
const NEWS_RELEASE_URL = BASE_URL + 'news_release/'
const SINGLE_IMAGE_URL = BASE_URL + 'image/'

const Hubble = {
  getNews: async () => {
    const url = NEWS_URL
    const resp = await axios(url)
    return resp.data.filter((el, i) => i < 10)
  },

  async getImgUrl(id) {
    const url = SINGLE_IMAGE_URL + id
    const resp = await axios(url)
    return resp.data.image_files[1].file_url
  },

  async getImagesForRelease(newsId) {
    const url = NEWS_RELEASE_URL + newsId
    const resp = await axios(url)
    const name = resp.data.name
    const imageIds = resp.data.release_images
    const images = await Promise.all(imageIds.map(id => {
      return this.getImgUrl(id)
    }))
    return {name, images}
  },
}

export default Hubble
import React, { Component } from 'react';
import './App.css';
import Loading from './components/Loading'
import axios from 'axios'
import Hubble from './Hubble'

const apiKey = 'SwFhSlwH5CmhsnTiG6rxdyqqx4tFteORyM47bzTl'

class App extends Component {
  constructor() {
    super()
    this.state = {
      daysBack: 0,
      imgInfo: null,
      news: [],
      hubbleRelease: null,
      loading: false,
    }
  }

  zeroPad = (num) => {
    const str = num.toString()
    return str.length < 2 ? '0' + str : str
  }

  formatDate = date => {
    const year = date.getFullYear()
    const day = this.zeroPad(date.getDate())
    const month = this.zeroPad(date.getMonth() + 1)
    return `${year}-${month}-${day}`
  }

  getData = async () => {
    await this.setState({loading: true})
    const oneDay = 1000*60*60*24
    const today = new Date()
    const date = new Date(today - (this.state.daysBack * oneDay))
    const dateParam = this.formatDate(date)
    const url = `https://api.nasa.gov/planetary/apod?date=${dateParam}&api_key=${apiKey}`
    const resp = await axios(url)
    const imgInfo = resp.data
    const loading = false
    this.setState({imgInfo, loading})
  }

  changeDay = async posOrNeg => {
    if (this.state.daysBack + posOrNeg >= 0) {
      await this.setState(prev => {
        const daysBack = prev.daysBack + posOrNeg
        return {daysBack}
      })
      this.getData()
    }
  }

  addEventListeners = () => {
    window.addEventListener('keyup', e => {
      const key = e.key
      if (key === 'ArrowLeft') {
        this.changeDay(1)
      } else if (key === 'ArrowRight') {
        this.changeDay(-1)
      }
    })
  }

  getNews = async () => {
    const news = await Hubble.getNews()
    await this.setState({news})
    this.getImagesForRelease(this.state.news[0].news_id)
  }

  getImagesForRelease = async (newsId) => {
    const hubbleRelease = await Hubble.getImagesForRelease(newsId)
    this.setState({hubbleRelease})
  }

  setToday = async () => {
    await this.setState({daysBack: 0})
    this.getData()
  }

  componentDidMount() {
    this.getData()
    this.addEventListeners()
    // this.getNews()
  }
  render() {
    const imgUrl = this.state.imgInfo ? this.state.imgInfo.url : ''
    const title = this.state.imgInfo ? `${this.state.imgInfo.title}` : ''
    const date = this.state.imgInfo ? `${this.state.imgInfo.date}` : ''
    return (
      <div className="App">
        <div className="info">
          <h1>Shane's Picture Of The Day</h1>
          <h2>{title}</h2>
          <h3>{date}</h3>
          <button onClick={() => this.changeDay(1)}>Previous</button>
          <button onClick={() => this.changeDay(-1)}>Next</button>
          <button className="today-button" onClick={this.setToday}>Today</button>
        </div>
        <div className="img-wrapper">
          {imgUrl && <img src={imgUrl} alt="APOD" />}
        </div>
        {this.state.loading && <Loading />}
      </div>
    );
  }
}

export default App;

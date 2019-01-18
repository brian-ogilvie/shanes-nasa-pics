import React, { Component } from 'react';
import './App.css';
import Loading from './components/Loading'
import APOD from './APOD'
import Hubble from './Hubble'

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

  getData = async () => {
    await this.setState({loading: true})
    const imgInfo = await APOD.getData(this.state.daysBack)
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

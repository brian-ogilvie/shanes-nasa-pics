import React, { Component } from 'react';
import './App.css';
import Loading from './components/Loading'
import ApodControls from './components/ApodControls'
import Hubble from './Hubble'

class App extends Component {
  constructor() {
    super()
    this.state = {
      news: [],
      hubbleRelease: null,
      loading: false,
      imgUrl: '',
    }
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

  setLoading = (loading) => {
    this.setState({loading})
  }

  setImage = imgUrl => {
    this.setState({imgUrl})
  }


  render() {
    const imgUrl = this.state.imgUrl
    return (
      <div className="App">
        <h1>Shane's NASA Pictures</h1>
        <ApodControls loading={this.setLoading} setImage={this.setImage}/>
        <div className="img-wrapper">
          {imgUrl && <img src={imgUrl} alt="APOD" />}
        </div>
        {this.state.loading && <Loading />}
      </div>
    );
  }
}

export default App;

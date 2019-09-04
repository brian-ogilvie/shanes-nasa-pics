import React, { Component } from 'react';
import './App.css';
import Loading from './components/Loading'
import ApodControls from './components/ApodControls'
import Hubble from './Hubble'
import Iframe from './components/Iframe';

require('dotenv').config();

class App extends Component {
  constructor() {
    super()
    this.state = {
      news: [],
      hubbleRelease: null,
      loading: false,
      mediaType: null,
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

  setImage = (mediaType, imgUrl) => {
    this.setState({mediaType, imgUrl});
  };

  renderMedia = () => {
    const { mediaType, imgUrl } = this.state;
    return mediaType === 'video'
      ? <Iframe src={imgUrl} title="APOD" />
      : <img src={imgUrl} alt="APOD" />;
  };

  render() {
    const { imgUrl } = this.state;
    return (
      <div className="App">
        <h1>Shane's NASA Pictures</h1>
        <ApodControls loading={this.setLoading} setImage={this.setImage}/>
        <div className="img-wrapper">
          {imgUrl && this.renderMedia()}
        </div>
        {this.state.loading && <Loading />}
      </div>
    );
  }
}

export default App;

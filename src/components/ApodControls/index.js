import React from 'react'
import './style.css'
import APOD from '../../APOD'

class ApodControls extends React.Component {
  constructor() {
    super()
    this.state = {
      daysBack: 0,
      imgInfo: null,
    }
  }

  handleKeyUp = e => {
    const key = e.key
    if (key === 'ArrowLeft') {
      this.changeDay(1)
    } else if (key === 'ArrowRight') {
      this.changeDay(-1)
    }
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

  setToday = async () => {
    await this.setState({daysBack: 0})
    this.getData()
  }

  getData = async () => {
    await this.props.loading(true)
    const imgInfo = await APOD.getData(this.state.daysBack)
    this.props.setImage(imgInfo.url)
    await this.setState({imgInfo})
    this.props.loading(false)
  }

  componentDidMount() {
    this.getData()
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  render() {
    const title = this.state.imgInfo ? `${this.state.imgInfo.title}` : ''
    const date = this.state.imgInfo ? `${this.state.imgInfo.date}` : ''
    return (
      <div className="info">
        <h2>{title}</h2>
        <h3>{date}</h3>
        <button onClick={() => this.changeDay(1)}>Previous</button>
        <button onClick={() => this.changeDay(-1)}>Next</button>
        <button className="today-button" onClick={this.setToday}>Today</button>
      </div>
    )
  }
}

export default ApodControls
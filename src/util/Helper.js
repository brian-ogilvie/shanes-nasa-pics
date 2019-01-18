const Helper = {
  formatDate(date) {
    const year = date.getFullYear()
    const day = this.zeroPad(date.getDate())
    const month = this.zeroPad(date.getMonth() + 1)
    return `${year}-${month}-${day}`
  },

  zeroPad(num) {
    const str = num.toString()
    return str.length < 2 ? '0' + str : str
  }
}

export default Helper
export class TimeCode {
  constructor(raw) {
    this.raw = raw
    if (typeof raw === 'string') {
      const parts = raw.split(':')
      this.hours = parseInt(parts[0])
      this.minutes = parseInt(parts[1])
      const secondParts = parts[2].split('.')
      this.seconds = parseInt(secondParts[0])
      if (secondParts[1]) {
        this.milliseconds = parseFloat(parts[2].split('.')[1])
      } else {
        this.milliseconds = 0
      }
    } else if (typeof raw === 'number') {
      raw = `${raw}`
      this.hours = 0
      this.minutes = 0
      const parts = raw.split('.')
      this.seconds = parseInt(parts[0])
      this.milliseconds = parts[1] ? parseInt(parts[1].substring(0, 3)) : 0
      if (this.seconds / 60 > 1) {
        this.minutes = Math.floor(this.seconds / 60)
        this.seconds -= this.minutes * 60

        if (this.minutes / 60 > 1) {
          this.hours = Math.floor(this.minutes / 60)
          this.minutes -= this.hours * 60
        }
      }
    }
  }

  /**
   * Add x milliseconds to the timecode
   * @param {number} x milliseconds
   */
  add(x) {
    this.milliseconds += x
    if (this.milliseconds >= 1000) {
      const seconds = Math.floor(this.milliseconds / 1000)
      this.milliseconds -= seconds * 1000
      this.seconds += seconds
      if (this.seconds >= 60) {
        const minutes = Math.floor(this.seconds / 60)
        this.seconds -= minutes * 60
        this.minutes += minutes
        if (this.minutes >= 60) {
          const hours = Math.floor(this.minutes / 60)
          this.minutes -= hours * 60
          this.hours += hours
        }
      }
    }
  }
  /**
   * Substract x milliseconds from the timecode
   * @param {number} x milliseconds
   */
  substract(x) {
    this.milliseconds -= x
    if (this.milliseconds < 0) {
      const seconds = Math.floor(Math.abs(this.milliseconds) / 1000)
      this.milliseconds = 1000 - Math.abs(this.milliseconds + seconds * 1000)
      this.seconds -= seconds + 1
      if (this.seconds < 0) {
        const minutes = Math.floor(Math.abs(this.seconds) / 60)
        this.seconds = 60 - Math.abs(this.seconds + minutes * 60)
        this.minutes -= minutes + 1
        if (this.minutes < 0) {
          const hours = Math.floor(Math.abs(this.minutes) / 60)
          this.minutes = 60 - Math.abs(this.minutes + hours * 60)
          this.hours -= hours + 1
          if (this.hours < 0) {
            this.hours = 0
            this.minutes = 0
            this.seconds = 0
            this.milliseconds = 0
          }
        }
      }
    }
  }

  toSeconds() {
    let milliseconds = this.milliseconds.toString()
    if (milliseconds.length === 2) {
      milliseconds = `0${milliseconds}`
    }

    return parseFloat(
      `${this.hours * 60 * 60 +
        this.minutes * 60 +
        this.seconds}.${milliseconds}`
    )
  }

  toString() {
    let milliseconds = this.milliseconds.toString()
    if (milliseconds.length === 1) {
      milliseconds += '00'
    }
    if (milliseconds.length === 2) {
      milliseconds += '0'
    }
    return `${ensureZero(this.hours)}:${ensureZero(this.minutes)}:${ensureZero(
      this.seconds
    )}.${milliseconds}`
  }
}

export class TimeCodeSpan {
  constructor(raw) {
    this.raw = raw
    raw = raw.split(',')
    this.start = new TimeCode(raw[0])
    if (raw[1]) {
      this.end = new TimeCode(raw[1])
    }
  }
  toString() {
    return `${this.start.toString()}${this.end
      ? `,${this.end.toString()}`
      : ''}`
  }
  static get regexp() {
    return /\d{1,2}:\d{2}:\d{2}\.\d{3}(,\d{1,2}:\d{2}:\d{2}\.\d{3})?/
  }
}

const ensureZero = input => (`${input}`.length === 1 ? '0' : '') + input

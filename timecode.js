export class TimeCode {
  constructor(raw) {
    this.raw = raw
    if (typeof raw === 'string') {
      const parts = raw.split(':')
      this.hours = parseInt(parts[0])
      this.minutes = parseInt(parts[1])
      this.seconds = parseInt(parts[2].split('.')[0])
      this.milliseconds = parseFloat(parts[2].split('.')[1])
    } else if (typeof raw === 'number') {
      raw = `${raw}`
      this.hours = 0
      this.minutes = 0
      this.seconds = parseInt(raw.split('.')[0])
      this.milliseconds = parseInt(raw.split('.')[1].substring(0, 3))
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
  static get regexp() {
    return /\d{1,2}:\d{2}:\d{2}\.\d{3}(,\d{1,2}:\d{2}:\d{2}\.\d{3})?/
  }
}

const ensureZero = input => (`${input}`.length === 1 ? '0' : '') + input

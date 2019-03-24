import { TimeCodeSpanVTT } from './timecode.js'

export class Subtitle {}

export class SubtitlesVTT {
  constructor(input, langs) {
    this.subtitles = []
    let subtitle
    if (typeof input === 'string') {
      for (let section of input.split('\n\n')) {
        if (section.startsWith('NOTE')) {
          // ignore the notes
          continue
        }
        if (section === '' || section === 'WEBVTT FILE') {
          continue // ignore empty lines or header
        }

        this.subtitles.push((subtitle = new Subtitle()))

        const lines = section.split('\n')
        if (!lines[0].match(TimeCodeSpanVTT.regexp)) {
          subtitle.cue = lines.shift()
        }

        subtitle.timecodespan = new TimeCodeSpanVTT(lines.shift())
        subtitle.start = subtitle.timecodespan.start
        subtitle.end = subtitle.timecodespan.end

        subtitle.text = {}
        const numberOfLines = lines.length / langs.length
        if (numberOfLines.toString().indexOf('.') > -1) {
          console.warn(section)
          throw new Error(`line number incorrect`)
        }

        let hideCount = 0,
          lang
        for (let i = 0; i < langs.length; ++i) {
          lang = langs[i]
          if (lang === 'hide') {
            hideCount++
            lang = `hide${hideCount}`
          }
          subtitle.text[lang] = lines
            .slice(i * numberOfLines, i * numberOfLines + numberOfLines)
            .join('\n')
        }
      }
    }
  }

  static constructFromString(input) {
    return new SubtitlesVTT(input)
  }
}

window.SubtitlesVTT = SubtitlesVTT

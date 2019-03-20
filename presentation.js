import { html } from '/node_modules/lit-html/lit-html.js'

export const presentationTemplate = (subtitle, songtitle) => {
  const cover = new Image()
  cover.src = `/files/${window.filebase}/cover.jpg`
  cover.id = 'cover'

  return html`
  <style>
    #background {
      background: #283593;
    }
    #songtitle {
      position: absolute;
      top: 0;
      left: 0;
      padding: 6px;
      font-size: 50%;
      display: flex;
      align-items: center;
    }
    #songtitle > span:first-of-type {
      position: relative;
      bottom: 1px;
    }
    #songtitle > span:last-of-type {
      font-size: 80%;
      margin: 0 0 0 6px;
    }

    .kr {
      font-family: NanumSquare
    }
    
    #subtitlesContainer {
      max-width: 520px;
      text-align: center;
      min-height: 20px;
    }

    .subtitle {
      margin: 0 0 12px;
      white-space: pre;
    }
    .subtitle:last-of-type {
      margin: 0;
    }

    #cover {
      width: 100px;
      /* margin: 0 0 10px; */
      position: absolute;
      top: 0;
      left: 0;
      margin: 10px;
    }
  </style>

  ${!songtitle
    ? html`<div id="songtitle" class=""><span>🎵</span><span>${songtitle}</span></div>`
    : null}

  ${cover}
  <div id="subtitlesContainer" class="draggable transparent">
    ${subtitle.langs &&
      subtitle.langs.map(
        lang =>
          subtitle[lang].trim()
            ? html`<div class="subtitle ${lang}">${subtitle[lang].trim()}</div>`
            : null
      )}
  </div>
  `
}

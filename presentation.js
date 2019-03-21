import { html } from '/node_modules/lit-html/lit-html.js'

let meta
import(`${dirpath}/meta.js`).then(_meta => {
  meta = _meta
})

const getCover = async () => {
  let cover = new Image()
  cover.id = 'cover'
  cover.style.height = '100%'
  return await new Promise(resolve => {
    cover.src = `${dirpath}/cover.jpg`
    cover.onerror = () => {
      resolve(null)
    }
    cover.onload = () => resolve(cover)
  })
}

export const presentationTemplate = async subtitle => {
  const cover = await getCover()

  return html`
  <style>
    #background {
      background: #000;
      z-index: -1
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
      font-family: NanumSquare;
      font-weight: 100;
      line-height: 44px;
      font-size: 32px;
    }
    .fr {
      color: #71b0ff;
      font-size: 24px;
      line-height: 34px;
    }
    
    #content {
      display: flex;
      width: 100%;
      padding: 0px 40px;
      box-sizing: border-box;
    }
    #subtitlesContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      text-align: center;
      min-height: 20px;
    }

    .subtitle {
      margin: 0 0 36px;
      white-space: pre-wrap;
      font-weight: 100;
      max-width: 500px;
    }
    .subtitle:last-of-type {
      margin: 0;
    }

    #cover-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    #cover {
      display: block;
      height: 375px !important;
    }
    #meta-name {
      padding: 4px 2px;
      opacity: .5;
      font-size: 60%;
    }
  </style>

  <div id="content">
    <div id="cover-container">
      ${cover}
      <div id="meta-name">${meta.name}</div>
    </div>
    <div id="subtitlesContainer" class="draggable transparent">
      ${subtitle.langs &&
        subtitle.langs.map(
          lang =>
            subtitle[lang].trim()
              ? html`<div class="subtitle ${lang}">${subtitle[
                  lang
                ].trim()}</div>`
              : null
        )}
    </div>
  </div>
  `
}

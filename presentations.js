import { html } from '/node_modules/lit-html/lit-html.js'

let meta
import(`${dirpath}/meta.js`).then(_meta => {
  meta = _meta
})

const getCover = async () => {
  let cover = new Image()
  cover.id = 'cover'
  return await new Promise(resolve => {
    cover.src = `${dirpath}/cover.jpg`
    cover.onerror = () => {
      resolve(null)
    }
    cover.onload = () => resolve(cover)
  })
}

let cover

export const subtitleTemplate = (subtitle, langs) => {
  return html`
  <style>
    .subtitle {
      white-space:pre-wrap;
      text-align: center;
    }
    .subtitle.kr {
      font-family: NanumSquare;
      font-size:120%;
      letter-spacing:1px;
      line-height:36px;
    }
    .subtitle:not(:last-of-type) {
      margin-bottom:16px;
    }
  </style>
  <div class="draggable hflex" id="subtitlesContainer">
    <!-- <div id="subtitlesContainer" class="draggable"> -->
      ${subtitle.text
        ? langs.map(lang => {
            if (lang === 'hide' || !subtitle.text[lang].trim()) {
              return // ignore
            }
            return html`
            <div class="subtitle ${lang}">${subtitle.text[lang].trim()}</div>`
          })
        : null}
    <!-- </div> -->
  </div>
  `
}

export const watermarkTemplate = () =>
  html`
  <style>
    #watermark {
      justify-content: flex-end;
      align-items: flex-end;
      color: white;
      font-size: 50%;
      padding: 3px 5px;
    }
  </style>
  <div class="layer" id="watermark">traduction: Valentin Degenne</div>`

export const defaultLayout = async (subtitle, langs) => {
  if (!cover) {
    cover = await getCover()
  }

  // console.log(subtitle, lang)
  return html`
  <style>
    #content {
      font-family: Roboto;
      letter-spacing: 1px;

      --first-color: blue;
      --second-color: #ffe3c7;
    }
  </style>

  <div id="content">
    <!-- COVER -->
    <style>
      #cover-layer {
        justify-content: flex-start;
        padding: 0 0 0 40px;
      }
      #cover-container {
        position: relative;
        top: 10px;
      }
      #cover {
        display: block;
        height: 320px;
        width: 320px;
      }
      #meta-name {
        padding: 4px 2px;
        opacity: .5;
        font-size: 60%;
        color: #fff;
      }
    </style>
    <div class="layer" id="cover-layer">
      ${cover
        ? html`
        <div id="cover-container">
          ${cover}
          <div id="meta-name">${meta.name}</div>
        </div>`
        : null}
    </div>

    <style>
      #lyrics-layer {
        justify-content: flex-end
      }
      #subtitlesContainer {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .subtitle {
        margin: 0 0 20px;
        white-space: pre-wrap;
        text-align: center;
      }
      .subtitle:last-of-type {
        margin: 0;
      }

      .kr {
        font-family: NanumSquare;
        line-height: 44px;
        font-size: 125%;
        letter-spacing: 1px;
        font-weight: 100;
      }
      .fr {
        color: var(--second-color);
        line-height: 34px;
      }
    </style>
    <div class="layer" id="lyrics-layer">
      <div id="subtitlesContainer" class="draggable">
        ${subtitle.text &&
          langs.map(
            lang =>
              lang !== 'hide' && subtitle.text[lang].trim()
                ? html`<div class="subtitle ${lang}">${subtitle.text[
                    lang
                  ].trim()}</div>`
                : null
          )}
      </div>
    </div>
  </div>
  ${meta.customHtml}
  `
}

export const coverLyricsHorizontal = async subtitle => {
  if (cover === undefined) {
    cover = await getCover()
  }

  return html`
  <style>
    #root {
      --main-color: red;
    }
    #cover-container {
      height: 280px
    }
    #cover {
      height: 100%
    }
    #subtitlesContainer {
      flex:1;
      justify-content: center;
      align-items: center;
    }
    .subtitle:nth-child(2) {
      color: var(--main-color)
    }
  </style>
  <div class="layer" id="root">
    ${cover ? html`<div id="cover-container">${cover}</div>` : null}
    ${subtitle}
  </div>
  ${watermarkTemplate()}
  ${meta.customHtml}
  `
}

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

export const presentationTemplate = async subtitle => {
  const cover = await getCover()

  return html`
  <style>
    #content {
      font-family: Roboto;
      letter-spacing: 1px;

      --first-color: blue;
      --second-color: red;
    }


    .layer {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    /* #background {
      background: #000;
      z-index: -3;
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


    
    #content {
      display: flex;
      width: 100%;
      padding: 0px 40px;
      box-sizing: border-box;
      height: 100%;
    }

    .subtitle {


    }
    .subtitle:last-of-type {
      margin: 0;
    }*/
  </style>

  <div id="content">
    <style>
      #background-layer {
        width:200px;
        height: 100%;
        background: var(--first-color);
      }
    </style>
    <div class="layer" id="background-layer"></div>

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
        justify-content: flex-end;
        padding: 0 40px 0 0;
      }
      #subtitlesContainer {
        width: 900px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .subtitle {
        margin: 0 0 36px;
        white-space: pre-wrap;
        width: 600px;
      }
      .subtitle:last-of-type {
        margin: 0;
      }

      .kr {
        font-family: NanumSquare;
        line-height: 44px;
        font-size: 32px;
        letter-spacing: 1px;
      }
      .fr {
        color: var(--second-color);
        font-size: 24px;
        line-height: 34px;
      }
    </style>
    <div class="layer" id="lyrics-layer">
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
  </div>
  ${meta.style}
  `
}

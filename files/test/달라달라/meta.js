import { html } from '/node_modules/lit-html/lit-html.js'

export const name = 'ITZY(있지) 달라달라(DALLA DALLA)'

export const customHtml = html`
  <style>
    video {
      display: initial;
    }
    #lyrics-layer {
      align-items: flex-end;
      padding: 0px 0 80px 0;
    }
    #subtitlesContainer {
      width: 100%;
    }
    .subtitle {
      background: #a81313cc;
      /* background: rgba(0, 0, 0, .8); */
      padding: 3px 16px;
      border-radius: 3px;
    }
    .fr {
      color: #fff;
    }
  </style>
  <div id="thanksToWatch" class="layer otrans transparent" style="background:#000">La vidéo avec les sous-titres en plus ?</div>
`

setTimeout(() => {
  for (let s of subtitlesManager.subtitles) {
    s.start.substract(500)
    s.end.substract(500)
    s.start.time = s.start.toSeconds()
    s.end.time = s.end.toSeconds()
  }
}, 1000)

window.onSubtitlesEnd = () => {
  thanksToWatch.classList.remove('transparent')
}

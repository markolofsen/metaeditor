import * as React from 'react'

// import '../../../../styles/debugpanel.css'

// context
import { usePlayer } from "../../../../context/"

interface Props {
  isFirst?: any
}

export const DebugPanel: React.FC<Props> = (props) => {
  const player = usePlayer()

  const isFirst = props.isFirst
  const show = isFirst ? false : true

  if (isFirst && player.state.devBar?.slug === 'pixelStreaming') {
    return (<div />)
  }

  return (
    <div
      id="playerUI"
      onWheel={e => e.stopPropagation()}
      style={{
        display: show === true ? 'block' : 'none',
      }}>

      <div id="overlay" className="overlay">

        <div id="overlayHeader">
          <div id="qualityStatus" className="greyStatus">***</div>
          <div id="overlayButton">+</div>
        </div>
        <div id="overlaySettings" className="container d-none">

          <div id="Controls" className="row">

            <section id="preStreamOptions" className="settingsContainer">

              <div id="preStreamOptionsHeader" className="settings-text">
                <div>Pre Stream Options</div>
              </div>

              <div className="row">
                <div className="col-sm">
                  <label className="form-check-label" htmlFor="force-turn-tgl">Force TURN</label>
                </div>
                <div className="form-check form-switch col-auto">
                  <input className="form-check-input" type="checkbox" role="switch" id="force-turn-tgl" />
                </div>
              </div>

              <div className="row" style={{ paddingTop: 5, paddingBottom: 5 }}>
                <div className="col col-auto">
                  <input id="restart-stream-button" className="overlay-button btn-flat" type="button"
                    defaultValue="Restart Stream" />
                </div>
              </div>
            </section>

            <section id="viewSettings" className="settingsContainer">
              <div id="viewSettingsHeader" className="settings-text">
                <div>Viewing</div>
              </div>
              <div id="viewSettingsContainer" className="d-none">

                <div className="row">
                  <div className="col-sm">
                    <label className="form-check-label" htmlFor="enlarge-display-to-fill-window-tgl">Enlarge
                      display to fill window</label>
                  </div>
                  <div className="form-check form-switch col-auto">
                    <input className="form-check-input" type="checkbox" role="switch"
                      id="enlarge-display-to-fill-window-tgl" defaultChecked />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm">
                    <label className="form-check-label" htmlFor="quality-control-ownership-tgl">Is Quality
                      Controller</label>
                  </div>
                  <div className="form-check form-switch col-auto">
                    <input className="form-check-input" type="checkbox" role="switch"
                      id="quality-control-ownership-tgl" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm">
                    <label className="form-check-label" htmlFor="match-viewport-res-tgl">Match viewport
                      resolution</label>
                  </div>
                  <div className="form-check form-switch col-auto">
                    <input className="form-check-input" type="checkbox" role="switch"
                      id="match-viewport-res-tgl" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm">
                    <label className="form-check-label" htmlFor="control-scheme-tgl"
                      id="control-scheme-title">Match viewport resolution</label>
                  </div>
                  <div className="form-check form-switch col-auto">
                    <input className="form-check-input" type="checkbox" role="switch"
                      id="control-scheme-tgl" />
                  </div>
                </div>
              </div>
            </section>

            <section id="commands" className="settingsContainer">
              <div id="commandsHeader" className="settings-text">
                <div>Commands</div>
              </div>
              <div id="commandsContainer" className="d-none">
                <div className="row" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <div className="row" style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <div className="col col-auto">
                      <input id="show-fps-button" className="overlay-button btn-flat" type="button"
                        defaultValue="Show FPS" />
                    </div>
                  </div>
                  <div className="col col-auto">
                    <label htmlFor="ui-descriptor-text" className="settings-text">UI Descriptor</label>
                  </div>
                  <div className="col col-auto">
                    <input type="text" className="form-control form-control-sm" id="ui-descriptor-text" />
                  </div>

                  <div className="col col-auto">
                    <input type="button" id="sendUiDescriptor" className="overlay-button btn-flat"
                      defaultValue="Send" />
                  </div>
                </div>
              </div>
            </section>

            <section id="streamingSettings" className="settingsContainer">
              <div id="streamingSettingsHeader" className="settings-text">
                <div>Settings</div>
              </div>
              <div id="streamingSettingsContainer" className="d-none">
                <div className="form-group row">
                  <div className="col-sm">
                    <div>Encoder Settings</div>
                    <div id="encoderSettings" className="col">
                      <div className="form-group row">
                        <label htmlFor="encoder-min-qp-text">Min QP</label>
                        <input type="number" className="form-control form-control-sm"
                          id="encoder-min-qp-text" defaultValue="0" min="0" max="51" />
                      </div>

                      <div className="form-group row">
                        <label htmlFor="encoder-max-qp-text">Max QP</label>
                        <input type="number" className="form-control form-control-sm"
                          id="encoder-max-qp-text" defaultValue="51" min="0" max="51" />
                      </div>

                    </div>
                  </div>

                  <div className="col-sm">
                    <div>WebRTC Settings</div>
                    <div id="webrtcSettings">
                      <div className="form-group row">
                        <label htmlFor="webrtc-fps-text">FPS</label>
                        <input type="number" className="form-control form-control-sm"
                          id="webrtc-fps-text" defaultValue="0" min="1" max="999" />
                      </div>
                      <div className="form-group row">
                        <label htmlFor="webrtc-min-bitrate-text">Min bitrate (bps)</label>
                        <input type="number" className="form-control form-control-sm"
                          id="webrtc-min-bitrate-text" defaultValue="0" min="0" max="100000" />
                      </div>
                      <div className="form-group row">
                        <label htmlFor="webrtc-max-bitrate-text">Max bitrate (bps)</label>
                        <input type="number" className="form-control form-control-sm"
                          id="webrtc-max-bitrate-text" defaultValue="0" min="0" max="100000" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <input id="btn-streaming-settings" className="overlay-button btn-flat" type="button"
                    defaultValue="Apply" />
                </div>
              </div>
            </section>

            <section id="statistics" className="settingsContainer">
              <div id="statisticsHeader" className="settings-text">
                <div>Statistics</div>
              </div>
              <div id="statisticsContainer" className="d-none">

                <div className="row">
                  <div className="col-sm">
                    <label className="form-check-label" htmlFor="send-stats-tgl" id="control-scheme-title">Send
                      to server</label>
                  </div>
                  <div className="form-check form-switch col-auto">
                    <input className="form-check-input" type="checkbox" role="switch" id="send-stats-tgl" />
                  </div>
                </div>
                <div id="statisticsResult" className="StatsResult"></div>
              </div>
            </section>

            <section id="latencyTest" className="settingsContainer">
              <div id="latencyTestHeader" className="settings-text">
                <div>Latency Test</div>
                <input id="btn-start-latency-test" className="overlay-button btn-flat" type="button"
                  defaultValue="Run Test" />
              </div>
              <div id="latencyTestContainer" className="d-none">
                <div id="latencyStatsResults" className="StatsResult"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react';
import PictureInPicture from './PictureInPicture';
import DownloadResult from './DownloadResult';

function Result({title, srcDoc}) {
    const [pipState, setPipState] = useState(false)

    function updatePipState(newPipState) {
        setPipState(newPipState)
    }

    function showIfPipIsntActive() {
        if (pipState == false) {
            return  <div className="cf-editor">
                        <div className="cf-editor-header">
                            <h2>{title}</h2>
                            <div className="cf-options">
                                <DownloadResult srcDoc={srcDoc} />
                                <PictureInPicture iframeId="cf-result" resultContainerId="cf-result-container" pipStateManager={updatePipState} />
                            </div>
                        </div>
                        <div className="cf-editor-monaco" id="cf-result-container">
                            <iframe
                                srcDoc={srcDoc}
                                id="cf-result"
                                title="output"
                                sandbox="allow-scripts"
                                width="100%"
                                height="100%"
                                style={{border:0}}>
                            </iframe>
                        </div>
                    </div>
        }
    }

    return showIfPipIsntActive()
}

export default Result;
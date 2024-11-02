import PIP from './PictureInPicture';

function Result({title, srcDoc}) {
    return (
        <div className="cf-editor">
            <div className="cf-editor-header">
                <h2>{title}</h2>
                <div className="cf-options">
                    <PIP></PIP>
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
    )
}

export default Result;
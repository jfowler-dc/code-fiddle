function PictureInPicture({iframeId, resultContainerId, pipStateManager}) {
    async function enablePIP() {
        const iframe = document.getElementById(iframeId);
        const pipWindow = await documentPictureInPicture.requestWindow();
        pipWindow.document.body.append(iframe);
        pipStateManager(true)
    
        pipWindow.addEventListener("pagehide", (event) => {
            pipStateManager(false)
            const resultContainer = document.getElementById(resultContainerId);
            const iframe = event.target.getElementById(iframeId);
            resultContainer.append(iframe);
        });
      }
    
    function ShowPIP() {
        if ('documentPictureInPicture' in window) {
            return <button onClick={enablePIP} aria-label={"Open Results in Picture in Picture Window"}>
                    <span className="material-symbols-outlined">
                    picture_in_picture_alt
                    </span>
                </button>
        }
    }

    return ShowPIP()
}

export default PictureInPicture;
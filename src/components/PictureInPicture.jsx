function PictureInPicture() {
    async function enablePIP() {
        const player = document.querySelector("#cf-result");
        const pipWindow = await documentPictureInPicture.requestWindow();
        pipWindow.document.body.append(player);
    
        pipWindow.addEventListener("pagehide", (event) => {
          const playerContainer = document.querySelector("#cf-result-container");
          const pipPlayer = event.target.querySelector("#cf-result");
          playerContainer.append(pipPlayer);
        });
      }
    
    function ShowPIP() {
        if ('documentPictureInPicture' in window) {
            return <button onClick={enablePIP}>
                <span className="material-symbols-outlined">
                picture_in_picture_alt
                </span>
            </button>
        }
    }

    return ShowPIP()
}

export default PictureInPicture;
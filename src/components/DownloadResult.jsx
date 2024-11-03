function DownloadResult({srcDoc}) {

    function convertTextToHTML() {
        const blob = new Blob([srcDoc], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'codeFiddle.html';
        link.click();
    }

    return (
        <button onClick={convertTextToHTML}>
            <span className="material-symbols-outlined">
            download
            </span>
        </button>
    )
}

export default DownloadResult;
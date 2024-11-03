function Copy({editorData, editorTitle}) {

    function copyToClipboard() {
        editorData.toString()
        navigator.clipboard.writeText(editorData)
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    return (
        <button onClick={copyToClipboard} aria-label={"Copy " + editorTitle}>
            <span className="material-symbols-outlined">
            content_copy
            </span>
        </button>
    )
}

export default Copy;
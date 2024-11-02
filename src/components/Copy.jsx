function Copy({editorData}) {

    function copyToClipboard() {
        editorData.toString()
        navigator.clipboard.writeText(editorData)
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    return (
        <button onClick={copyToClipboard}>
            <span className="material-symbols-outlined">
            content_copy
            </span>
        </button>
    )
}

export default Copy;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Copy({editorData, editorTitle}) {

    function copyToClipboard() {
        editorData.toString()
        navigator.clipboard.writeText(editorData)
            .then(() => {
                toast(editorTitle + " has been copied!")
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    return (
        <>
        <button onClick={copyToClipboard} aria-label={"Copy " + editorTitle}>
            <span className="material-symbols-outlined">
            content_copy
            </span>
        </button>
        <ToastContainer />
        </>
    )
}

export default Copy;
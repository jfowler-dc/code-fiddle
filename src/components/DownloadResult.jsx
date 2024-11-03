import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DownloadResult({srcDoc}) {

    function convertTextToHTML() {
        const blob = new Blob([srcDoc], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'codeFiddle.html';
        link.click();
        toast('Files have been downloaded.')
    }

    return (
        <>
            <button onClick={convertTextToHTML} aria-label="Download Result">
                <span className="material-symbols-outlined">
                download
                </span>
            </button>
            <ToastContainer />
        </>
    )
}

export default DownloadResult;
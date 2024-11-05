import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppHeader({html, css, js}) {

    function localSave() {
        localStorage.setItem("codeFiddleHtml", html);
        localStorage.setItem("codeFiddleCss", css);
        localStorage.setItem("codeFiddleJs", js);
        toast('Project has been saved locally')
    }

    return (
        <header className='cf-header'>
            <div className="cf-logo" aria-label="codeFiddle Logo">
                <span className="material-symbols-outlined">
                terminal
                </span>
                <h1>codeFiddle</h1>
            </div>

            <div className="cf-header-actions">
                <button onClick={localSave} aria-label="Save Work to Local Storage">
                    <span className="material-symbols-outlined">
                    save
                    </span>
                </button>
                
                <div className="cf-user-icon" aria-label="User Icon">
                </div>
                <ToastContainer />
            </div>
        </header>
    )
}

export default AppHeader;
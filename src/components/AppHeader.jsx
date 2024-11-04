function AppHeader({html, css, js}) {

    function save() {
        localStorage.setItem("codeFiddleHtml", html);
        localStorage.setItem("codeFiddleCss", css);
        localStorage.setItem("codeFiddleJs", js);
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
                <button onClick={save} aria-label="Save Work to Local Storage">
                    <span className="material-symbols-outlined">
                    save
                    </span>
                </button>
                
                <div className="cf-user-icon" aria-label="User Icon">
                </div>
                
            </div>
        </header>
    )
}

export default AppHeader;
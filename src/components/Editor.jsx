import PropTypes from 'prop-types';
import Copy from './Copy';

function Editor({title, editorRef, data}) {
    return (
        <div className="cf-editor">
            <div className="cf-editor-header">
                <h2>{title}</h2>
                <div className="cf-options">
                    <Copy editorData={data} editorTitle={title} />
                </div>
            </div>
            <div className="cf-editor-monaco" ref={editorRef}>
            </div>
        </div>
    )
}

Editor.propTypes = {
  title: PropTypes.string.isRequired,
  editorRef: PropTypes.object.isRequired,
  data: PropTypes.string.isRequired,
};

export default Editor;
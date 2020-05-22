import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./style.css";
import rdmd from '@readme/markdown';

function MarkdownEditor({ file, write }) {


  const [content, setContent] = React.useState('');
  const [modify, setModify] = React.useState(1);

  useEffect(() => {
    (async () => {
      setContent(await file.text());
    })();
  }, [file]);


  const modifyDate = () => { //change date for the first time editing
    if(modify) {
      onExit();
      setModify(null);
    }
  }

  const onFileChange = (event) => {
    const input = event.target.value;
    setContent(input);
    modifyDate();
  }

  const onExit = () => {
    setModify(1); //this case, whenever switch to a new document, change date for the first edit would still work
    const input = event.target.value;
    const newFile = new File(
      [input],
      file.name,
      { 
        type: "text/markdown",
        lastModified: new Date()
      }
    );
    write(newFile);
  }

  return (
    <div>
      <h3>{file.name}</h3>
      <textarea className={css.editor} value={content} rows={20} onChange={onFileChange} onBlur={onExit}></textarea>

        <div className={css.preview}>
          <div className={css.content}>{rdmd(content)}</div>
        </div>


    </div>
  );

}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./style.css";

function MarkdownEditor({ file, write }) {

  const [content, setContent] = React.useState('');

  useEffect(() => {
    (async () => {
      setContent(await file.text());
    })();
  });

  console.log(file, write);
  return (
    <div className={css.editor}>
      <h3>{file.name}</h3>
      
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;

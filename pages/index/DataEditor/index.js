import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from './style.css';
import dynamic from 'next/dynamic'

// use the component in your app!
function DataEditor({ file, write }) {

  const [content, setContent] = React.useState({});
  const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

  useEffect(() => {
    (async () => {
      const data = await file.text();
      const json = JSON.parse(data);
      setContent(json);
    })();
  }, [file]);

  const onFileChange = (edit) => {
    setContent(edit.updated_src);
    const newFile = new File(
      [JSON.stringify(edit.updated_src)],
      file.name,
      {
        type: "application/json",
        lastModified: new Date()
      }
    );
    write(newFile);
  }


  return (
    <div className={css.editor}>
      <DynamicReactJson src={content} onEdit={onFileChange} onDelete={onFileChange} onAdd={onFileChange} ></DynamicReactJson>
    </div>
  );
}

DataEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default DataEditor;

import React from 'react';
import AddFileButton from './AddFileButton';

const FileField = ({ title, style, ...props }) => {
  const [text, setText] = React.useState(title);
  return (
    <div
      className='file_field'
      style={style ? style : { width: '727px', height: '193px' }}
      {...props}
    >
      <div className='wrapper'>
        <AddFileButton handleFile={(file) => setText(file.name)} />
        <p className='info_text'>{text}</p>
      </div>
    </div>
  );
};

export default FileField;

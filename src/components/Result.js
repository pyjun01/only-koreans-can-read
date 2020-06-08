import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Result = ({ result }) => {
  const onCopyBtnClick = () => {
    let textarea = document.createElement('textarea');
    document.body.append(textarea);
    textarea.value = result;
    textarea.select();
    document.execCommand('copy');
    textarea.parentElement.removeChild(textarea);
  }

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <p style={{
        flex: 1,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all'
      }}>{result}</p>
      <button onClick={onCopyBtnClick}>복사!</button>
    </div>
  );
}

export default Result;
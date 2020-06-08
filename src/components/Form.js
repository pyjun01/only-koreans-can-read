import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Form = ({ sentence, onSubmit, onInputChange }) => {
  return (
    <form
      onSubmit={onSubmit}
      css={css`
        display: flex;
        margin: 10px 0;
      `}
    >
      <input
        type='text'
        value={sentence}
        onChange={onInputChange}
        css={css`
          flex: 1;
        `}
      />
      <button type='submit'>변신!</button>
    </form>
  );
}

export default Form;

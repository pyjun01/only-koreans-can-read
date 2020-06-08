import React, { useState } from 'react';
/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core';
import {
  Title,
  TypeRadioGroup,
  Form,
  Result,
} from './components';
import { translateSentence } from './utils';

const App = () => {
  const [sentence, setSentence] = useState('');
  const [type, setType] = useState('shift');
  const [result, setResult] = useState('');

  const onTypeChange = (e) => {
    setType(e.target.value);
  };
  const onSubmit = (eve) => {
    let str = translateSentence({ type, sentence });

    setResult(str);
    eve.preventDefault();
  }
  const onInputChange = (e) => {
    setSentence(e.target.value);
  }

  return (
    <div
      className="App"
      css={css`
        max-width: 500px;
        margin: auto;

        > * { max-width: 500px; }
      `}
    >
      <Global
        styles={css`
          * { margin: 0; padding: 0; box-sizing: border-box; }
        `}
      />
      <Title />
      <TypeRadioGroup
        type={type}
        onTypeChange={onTypeChange}
      />
      <Form
        sentence={sentence}
        onSubmit={onSubmit}
        onInputChange={onInputChange}
      />
      {
        result &&
        <Result
          result={result}
        />
      }
    </div>
  );
}

export default App;

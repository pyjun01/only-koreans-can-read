import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Title = () => {
  return (
    <h1
      css={css`
        margin: 60px 0 40px;
        text-align: center;
      `}
    >
      한국인만 읽을수 있는 문장 변환기
    </h1>
  );
}

export default Title;

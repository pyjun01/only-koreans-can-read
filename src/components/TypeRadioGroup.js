import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const types = [{
  label: 'Shift까 꼬짱났따',
  type: 'shift'
}, {
  label: '받침 추가',
  type: 'addCoda'
}, {
  label: 'ㅋㅣㅂㅗㄷㅡㄱㅏ ㅇㅣㅅㅏㅇㅎㅐ',
  type: 'separation'
}];

const TypeRadioGroup = ({ type, onTypeChange }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {
        types.map(({ label, type: arrType }) => (
          <div
            css={css`
              & + & { margin-top: 10px; }
            `}
          >
            <label key={label}>
              <input
                type='radio'
                name='type'
                value={arrType}
                onChange={onTypeChange}
                checked={type === arrType}
                css={css`
                  margin-right: 5px;
                `}
              />
              <span>{label}</span>
            </label>
          </div>
        ))
      }
    </div>
  );
}

export default TypeRadioGroup;

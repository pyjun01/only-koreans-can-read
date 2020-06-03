import React, { useState } from 'react';

const translateMethod = {
  ga: '가'.charCodeAt(0),
  onset: 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split(''),
  nuclues: 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split(''),
  coda: ['', ...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'.split('')],

  shift: function(sentence) {
    return sentence.split('').map(str => {
      let strUniCode = str.charCodeAt(0);
      let idx = parseInt((strUniCode - this.ga) / 588);

      if ([0, 3, 7, 9, 12].includes(idx)) {
        return String.fromCharCode(strUniCode + 588);
      }

      return str;
    }).join('');
  },
  addCoda: function(sentence) {
    return sentence.split('').map(str => {
      let strUniCode = str.charCodeAt(0);

      if (strUniCode < 44032 || 55203 < strUniCode) return str;

      let idx = parseInt((strUniCode - 44032) % 28);
      if (idx === 0) {
        return String.fromCharCode(strUniCode + 21);
      }

      return str;
    }).join('');
  },
  separation: function(sentence) {
    return sentence.split('').map(str => {
      let strUniCode = str.charCodeAt(0);

      if (strUniCode < 44032 || 55203 < strUniCode) return str;

      let idx = parseInt((strUniCode - 44032));
      return this.onset[parseInt(idx / 588)]+this.nuclues[parseInt(idx % 588 / 28)]+this.coda[parseInt(idx % 28)];
    }).join('');
  },
};

const App = () => {
  const [sentence, setSentence] = useState('');
  const [type, setType] = useState('shift');
  const [result, setResult] = useState('');

  const types = [{
    label: 'Shift 권법',
    type: 'shift'
  }, {
    label: '받침 넣기',
    type: 'addCoda'
  }, {
    label: 'ㅋㅣㅂㅗㄷㅡㄱㅏ ㅇㅣㅅㅏㅇㅎㅐ',
    type: 'separation'
  }];

  const onTypeChange = (e) => {
    setType(e.target.value);
  }
  const onInputChange = (e) => {
    setSentence(e.target.value);
  }
  const onTranslateBtnClick = () => {
    let str = (() => {
      if (types.map(({ type }) => type).includes(type)) {
        return translateMethod[type](sentence);
      }

      return sentence;
    })();

    setResult(str);
  }
  const onCopyBtnClick = () => {
    let textarea = document.createElement('textarea');
    document.body.append(textarea);
    textarea.value = result;
    textarea.select();
    document.execCommand('copy');
    textarea.parentElement.removeChild(textarea);
  }

  return (
    <div className="App">
      <h1>한국인만 읽을수 있는 문장 변환기</h1>
      <div>
        {
          types.map(({label, type: arrType}) => (
            <label key={label}>
              <input
                type='radio'
                name='type'
                value={arrType}
                onChange={onTypeChange}
                checked={type === arrType}
              />
              <span>{label}</span>
            </label>
          ))
        }
      </div>
      <div>
        <input
          type='text'
          value={sentence}
          onChange={onInputChange}
        />
        <button onClick={onTranslateBtnClick}>변신!</button>
      </div>
      {
        result &&
        <div>
          <p>{result}</p>
          <button onClick={onCopyBtnClick}>복사!</button>
        </div>
      }
    </div>
  );
}

export default App;

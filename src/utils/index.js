const ga = '가'.charCodeAt(0);
const onset = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('');
const nuclues = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split('');
const coda = ['', ...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'.split('')];

const translateMethod = {
  shift: ({ str, strUniCode }) => {
    let idx = parseInt((strUniCode - ga) / 588);

    if ([0, 3, 7, 9, 12].includes(idx)) {
      return String.fromCharCode(strUniCode + 588);
    }

    return str;
  },
  addCoda: ({ str, strUniCode }) => {
    if (strUniCode < 44032 || 55203 < strUniCode) return str;

    let idx = parseInt((strUniCode - 44032) % 28);
    if (idx === 0) {
      return String.fromCharCode(strUniCode + 21);
    }

    return str;
  },
  separation: ({ str, strUniCode }) => {
    if (strUniCode < 44032 || 55203 < strUniCode) return str;

    let idx = parseInt((strUniCode - 44032));
    return onset[parseInt(idx / 588)]+nuclues[parseInt(idx % 588 / 28)]+coda[parseInt(idx % 28)];
  },
};

export const translateSentence = ({ type, sentence}) => sentence.split('').map(str => translateMethod[type]({ str, strUniCode: str.charCodeAt(0) })).join('');
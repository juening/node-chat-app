const expect = require('expect');

const {isRealString} = require('./validation');

describe('validation test', () => {
  it('should return true if valid string provided', () => {
    const str = 'Hello world';
    const result = isRealString(str);
    expect(result).toBe(true);
  });
  it('should reject strings with only spaces', () => {
    const str = '     ';
    const result = isRealString(str);
    expect(result).toBe(false);
  });
  it('should reject non-string values', () => {
    const str = 1223;
    const result = isRealString(str);
    expect(result).toBe(false);
  });
})

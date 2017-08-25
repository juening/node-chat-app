const expect = require('expect');
const {generateMessage, generateLocation} = require('./message');

describe('generate message ', () => {
  it('should generate correct message object', () => {
    const testFrom = 'John Doe';
    const testText = 'Happy Coding';
    const res = generateMessage(testFrom, testText);
    expect(res).toInclude({
      from:testFrom,
      text:testText
    });
    expect(res.createdAt).toBeA('number');
  });

  it('should generation correct url address', () => {
    const testFrom = 'admin';
    const lat = 41.2746482;
    const lon = -71.1514581;
    const res = generateLocation(testFrom, lat, lon);
    expect(res).toInclude({
      from: testFrom,
      url: `https://www.google.com/maps?q=${lat},${lon}`
    });
  })
});

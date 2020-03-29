const generated = require('../../src/utils/generateId')

describe('Generate Id', () => {
  it('should be generated an unique id', () => {
    const id = generated();

    expect(id).toHaveLength(8);
  });
});
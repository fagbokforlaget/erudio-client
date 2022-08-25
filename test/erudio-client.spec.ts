import { getStructures } from '../src/erudio-client';

describe('Get all structures', () => {
  it('has list of structure nodes', () => {
    const allStructureData = getStructures(
      'fb29c948-327f-4f56-abb5-247e4cec5a22',
      {
        limit: 10,
        page: 0,
      },
    );
    expect(allStructureData).toBeDefined();
  });
});

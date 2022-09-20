import { ErudioClient } from '../src/erudio-client';
import MockAdapter from 'axios-mock-adapter';
import { content } from './data/get-structure-node-data';
import { nodeList } from './data/get-structure-nodes';
import axios from 'axios';

jest.setTimeout(30000);
const mock = new MockAdapter(axios);

describe('Throws exemption for', () => {
  it('URL not found', async () => {
    const ec = new ErudioClient('dev.example.com');
    mock
      .onAny('http://edtech-structure-service.dev.example.com/')
      .networkErrorOnce();
    const allStructureData = ec.getStructures(
      'fb29c948-327f-4f56-abb5-247e4cec5a22',
      {
        limit: 10,
        page: 0,
      },
    );
    await expect(allStructureData).rejects.toMatchObject({
      message: 'Request failed with status code 404',
      status: 404,
    });
  });
});

describe('Should respond with valid data', () => {
  it('Should return structure node list', async () => {
    const structureService =
      'http://edtech-structure-service.dev.example.com/structures/';
    mock
      .onGet(`${structureService}fb29c948-327f-4f56-abb5-247e4cec5a22/nodes`)
      .reply(200, nodeList);
    const ec = new ErudioClient('dev.example.com');
    const nodes = await ec.getStructures(
      'fb29c948-327f-4f56-abb5-247e4cec5a22',
    );
    expect(nodes).toEqual(nodeList);
  });

  it('Should return node details', async () => {
    const contentFusionService =
      'http://edtech-content-fusion-service.dev.example.com/content/';
    mock
      .onGet(`${contentFusionService}fb29c948-327f-4f56-abb5-247e4cec5a22`)
      .reply(200, content);
    const ec = new ErudioClient('dev.example.com');
    const allStructureData = await ec.getStructureNode(
      'fb29c948-327f-4f56-abb5-247e4cec5a22',
    );
    expect(allStructureData).toEqual(content);
  });
});

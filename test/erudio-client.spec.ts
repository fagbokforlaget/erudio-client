import { ErudioClient } from '../src/erudio-client';
import MockAdapter from 'axios-mock-adapter';
import { content, structureNodeData } from './data/get-structure-node-data';
import { nodeList, singleNode } from './data/get-structure-nodes';
import axios from 'axios';

const mock = new MockAdapter(axios);
const structureService =
  'http://edtech-structure-service.dev.example.com/structures/';

const namespace: string = 'fb29c948-327f-4f56-abb5-247e4cec5a22';
const structureID: string = 'b942d4de-921c-4406-abbd-464dabb7b210';
const childNodeID: string = 'b942d4de-921c-4406-abbd-464dabb7b212';

describe('Throws exemption for', () => {
  it('URL not found', async () => {
    const ec = new ErudioClient('dev.example.com');
    mock
      .onAny('http://edtech-structure-service.dev.example.com/')
      .networkErrorOnce();
    const allStructureData = ec.getStructures(namespace, {
      limit: 10,
      page: 0,
    });
    await expect(allStructureData).rejects.toMatchObject({
      message: 'Request failed with status code 404',
      status: 404,
    });
  });
});

describe('Should respond with valid data', () => {
  it('Should return structure node list', async () => {
    mock.onGet(`${structureService}${namespace}/nodes`).reply(200, nodeList);
    const ec = new ErudioClient('dev.example.com');
    const nodes = await ec.getStructures(namespace);
    expect(nodes).toEqual(nodeList);
  });

  it('Should return node details', async () => {
    const contentFusionService =
      'http://edtech-content-fusion-service.dev.example.com/content/';
    mock
      .onGet(`${structureService}${namespace}/nodes/${structureID}`)
      .replyOnce(200, singleNode);
    mock
      .onGet(`${structureService}children/nodes/${structureID}`)
      .replyOnce(200, nodeList);
    mock.onGet(`${contentFusionService}${childNodeID}`).replyOnce(200, content);
    mock.onGet(`${contentFusionService}${structureID}`).replyOnce(200, content);
    const ec = new ErudioClient('dev.example.com');
    const allStructureData = await ec.getStructureNode(namespace, structureID);
    expect(allStructureData).toEqual(structureNodeData);
  });
});

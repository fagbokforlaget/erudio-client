import { ErudioClient } from '../src/erudio-client';
import MockAdapter from 'axios-mock-adapter';
import { content, structureNodeData } from './data/get-structure-node-data';
import { nodeList, singleNode } from './data/get-structure-nodes';
import axios from 'axios';

const mock = new MockAdapter(axios);
const structureService =
  'http://edtech-structure-service.dev.example.com/structures/';
const contentFusionService =
  'http://edtech-content-fusion-service.dev.example.com/content/';

const namespace: string = 'fb29c948-327f-4f56-abb5-247e4cec5a22';
const structureID: string = 'b942d4de-921c-4406-abbd-464dabb7b210';
const childNodeID: string = 'b942d4de-921c-4406-abbd-464dabb7b212';
const ec = new ErudioClient('dev.example.com');

describe('Throws exemption for', () => {
  it('URL not found', async () => {
    mock.onAny(structureService).replyOnce(404);
    const allStructureData = ec.getStructures(namespace, {
      limit: 10,
      page: 0,
    });
    await expect(allStructureData).rejects.toMatchObject({
      message: 'Request failed with status code 404',
      status: 404,
    });
  });
  it('object not found', async () => {
    mock.resetHistory();
    mock.reset();
    mock
      .onGet(`${structureService}${namespace}/nodes/${structureID}`)
      .replyOnce(200, singleNode);
    mock
      .onGet(`${structureService}${namespace}/children/nodes/${structureID}`)
      .replyOnce(200, nodeList);

    mock.onGet(`${contentFusionService}${childNodeID}`).replyOnce(404);
    const allStructureData = ec.getStructureNode(namespace, structureID);
    await expect(allStructureData).rejects.toMatchObject({
      message: 'Request failed with status code 404',
      status: 404,
      data: undefined,
    });
  });
});

describe('Should respond with valid data', () => {
  it('Should return structure node list', async () => {
    mock.onGet(`${structureService}${namespace}/nodes`).reply(200, nodeList);
    const nodes = await ec.getStructures(namespace);
    expect(nodes).toEqual(nodeList);
  });
  it('Should return node details', async () => {
    mock
      .onGet(`${structureService}${namespace}/nodes/${structureID}`)
      .replyOnce(200, singleNode);
    mock
      .onGet(`${structureService}${namespace}/children/nodes/${structureID}`)
      .replyOnce(200, nodeList);
    mock.onGet(`${contentFusionService}${childNodeID}`).reply(200, content);
    const allStructureData = await ec.getStructureNode(namespace, structureID);
    expect(allStructureData).toEqual(structureNodeData);
  });
});

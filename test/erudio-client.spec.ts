import { ErudioClient } from '../src/erudio-client';
import MockAdapter from 'axios-mock-adapter';
import { content, structureNodeData } from './data/get-structure-node-data';
import { nodeList, singleNode } from './data/get-structure-nodes';
import axios from 'axios';
import { structureLinkTagData, structureTagData } from './data/get-tags-data';
import { ServiceType } from '../src/utils/service.types';
import { structureLink } from './data/get-structure-link-data';

describe('Erudio Client', () => {
  let mock, ec: ErudioClient;
  const structureService =
    'http://edtech-structure-service.dev.example.com/structures/';
  const contentFusionService =
    'http://edtech-content-fusion-service.dev.example.com/content/';
  const tagService = 'http://edtech-tag-store-service.dev.example.com/tags';
  const structureLinkService =
    'http://edtech-structure-link-service.dev.example.com/structures/links';

  const namespace = 'fb29c948-327f-4f56-abb5-247e4cec5a22';
  const structureID = 'b942d4de-921c-4406-abbd-464dabb7b210';
  const childNodeID = 'b942d4de-921c-4406-abbd-464dabb7b212';
  const linkId = '4760bef0-f3eb-436a-9124-126f6d72b18f';

  beforeEach(() => {
    mock = new MockAdapter(axios);
    ec = new ErudioClient('dev.example.com');
  });

  afterEach(() => {
    mock.resetHistory();
    mock.reset();
  });

  describe('Throws exception for', () => {
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

    it('link not found', async () => {
      mock.onGet(structureLinkService).replyOnce(200, []);

      const linkData = ec.getLinkedStructure(linkId);

      await expect(linkData).rejects.toMatchObject({
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

    it('Should return node details with empty tags array', async () => {
      mock
        .onGet(`${structureService}${namespace}/nodes/${structureID}`)
        .replyOnce(200, singleNode);
      mock
        .onGet(`${structureService}${namespace}/children/nodes/${structureID}`)
        .replyOnce(200, nodeList);
      mock.onGet(`${contentFusionService}${childNodeID}`).reply(200, content);

      const allStructureData = await ec.getStructureNode(
        namespace,
        structureID,
      );

      expect(allStructureData).toEqual({ ...structureNodeData, tags: [] });
    });

    it('Should return node details with tags array', async () => {
      mock
        .onGet(`${structureService}${namespace}/nodes/${structureID}`)
        .replyOnce(200, singleNode);
      mock
        .onGet(`${structureService}${namespace}/children/nodes/${structureID}`)
        .replyOnce(200, nodeList);
      mock
        .onGet(`${tagService}/${ServiceType.STRUCTURE}/${structureID}`)
        .replyOnce(200, structureTagData);
      mock.onGet(`${contentFusionService}${childNodeID}`).reply(200, content);

      const allStructureData = await ec.getStructureNode(
        namespace,
        structureID,
      );

      expect(allStructureData).toEqual({
        ...structureNodeData,
        tags: structureTagData.tags,
      });
    });

    it('should return list of structureLinks', async () => {
      mock.onGet(structureLinkService).replyOnce(200, structureLink);

      const allLinks = await ec.getStructureLinks({});

      expect(allLinks).toEqual(structureLink);
    });

    it('should return structure that is source of structure-link', async () => {
      mock.onGet(structureLinkService).replyOnce(200, structureLink);

      mock
        .onGet(`${structureService}${namespace}/nodes/${structureID}`)
        .replyOnce(200, singleNode);
      mock
        .onGet(`${structureService}${namespace}/children/nodes/${structureID}`)
        .replyOnce(200, nodeList);
      mock
        .onGet(`${tagService}/${ServiceType.STRUCTURE}/${structureID}`)
        .replyOnce(200, structureTagData);

      mock
        .onGet(`${tagService}/${ServiceType.LINK}/${linkId}`)
        .replyOnce(200, structureLinkTagData);

      mock.onGet(`${contentFusionService}${childNodeID}`).reply(200, content);

      const allStructureData = await ec.getLinkedStructure(linkId);

      expect(allStructureData).toEqual({
        ...structureNodeData,
        tags: structureLinkTagData.tags,
      });
    });
  });
});

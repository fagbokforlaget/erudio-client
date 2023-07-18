import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ErudioClient } from '../src/erudio-client';
import { ServiceType } from '../src/utils/service.types';
import { structureLink } from './data/get-structure-link-data';
import { structureLocalization } from './data/get-structure-localization';
import {
  content,
  learningPathContent,
  structureNodeData,
} from './data/get-structure-node-data';
import {
  nodeList,
  singleLearningPathNode,
  singleNode,
} from './data/get-structure-nodes';
import { structureLinkTagData, structureTagData } from './data/get-tags-data';
import { learningPath } from './data/learning-path-data';

describe('Erudio Client', () => {
  let mock, ec: ErudioClient;
  const structureService =
    'http://edtech-structure-service.dev.example.com/structures/';
  const contentFusionService =
    'http://edtech-content-fusion-service.dev.example.com/content/';
  const tagService = 'http://edtech-tag-store-service.dev.example.com/tags';
  const structureLinkService =
    'http://edtech-structure-link-service.dev.example.com/structures/links';
  const localizationService =
    'http://edtech-localization-service.dev.example.com/localizations';
  const learningPathService =
    'http://edtech-learning-path-runner-service.dev.example.com/learning-paths';

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

    it('should return structure with localized data', async () => {
      mock
        .onGet(`${structureService}${namespace}/nodes/${structureID}`)
        .replyOnce(200, singleNode);
      mock
        .onGet(`${structureService}${namespace}/children/nodes/${structureID}`)
        .replyOnce(200, nodeList);
      mock.onGet(`${contentFusionService}${childNodeID}`).reply(200, content);
      mock
        .onGet(
          `${localizationService}/${ServiceType.STRUCTURE}/${structureID}/en`,
        )
        .reply(200, structureLocalization);

      const allStructureData = await ec.getStructureNode(
        namespace,
        structureID,
        'en',
      );

      ['name', 'description', 'cover'].forEach((key) => {
        expect(allStructureData.localization[key]).toEqual(
          structureLocalization.content[key],
        );
      });
    });

    it('Should return structure node list with learning path', async () => {
      mock
        .onGet(`${structureService}${namespace}/nodes/${structureID}`)
        .replyOnce(200, singleLearningPathNode);
      mock
        .onGet(`${structureService}${namespace}/children/nodes/${structureID}`)
        .replyOnce(200, nodeList);
      mock
        .onGet(`${contentFusionService}${childNodeID}`)
        .reply(200, learningPathContent);
      mock
        .onGet(
          `${learningPathService}/${learningPathContent.content.learningPath.id}`,
        )
        .reply(200, learningPath);

      const allStructureData = await ec.getStructureNode(
        namespace,
        structureID,
      );

      expect(allStructureData).toMatchObject({
        learningPath,
      });
    });
  });
});

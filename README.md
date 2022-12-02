# Erudio Client

Erudio HTTP library to fetch data from various endpoint/GraphQL

## Usecase

```
const erudioClient = new ErudioClient(<domain>);

// Get 10 structure nodes for given namespace
const nodes = erudioClient.getStructures( 'f07e196f-e4bd-46f0-97a5-c3ae768683dc', {limit:10});

// Get single Node filled with data, for given structureId
const singleNode = erudioClient.getStructureNode( 'f07e796f-e3bd-46f0-97a5-c3ae7409dc', 'en');

// Get all the tags for given object type and object id.
const tags = erudioClient.getTags(ServiceType.CONTENT, 'f07e796f-e3bd-46f0-97a5-c3ae7409da');

// Get all the links by given namespaceId
const links = erudioClient.getStructureLinks({targetNamespaceId: 'f07e796f-e3bd-46f0-97a5-c3ae7409dc'});

// Get all the links by given structureId
const links = erudioClient.getStructureLinks({sourceId: 'f07e796f-e3bd-46f0-97a5-c3ae7409dc'});

// Get single Node filled with data, for given linkId
const singleNode = erudioClient.getLinkedStructure('f07e796f-e3bd-46f0-97a5-c3ae7409dc', 'en');
```

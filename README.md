# Erudio Client

Erudio HTTP library to fetch data from various endpoint/GraphQL

## Usecase

```
const erudioClient = new ErudioClient(<domain>);
const nodes = erudioClient.getStructures( 'f07e196f-e4bd-46f0-97a5-c3ae768683dc', {limit:10});
const singleNode = erudioClient.getStructureNode( 'f07e796f-e3bd-46f0-97a5-c3ae7409dc', 'en');
const tags = erudioClient.getTags(ServiceType.CONTENT, 'f07e796f-e3bd-46f0-97a5-c3ae7409da')
```
